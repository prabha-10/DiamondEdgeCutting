"use client";

import { useState, useRef, MouseEvent, ReactNode, forwardRef } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Omit conflicting props between React.ButtonHTMLAttributes and framer-motion's motion.button
export interface DemolitionButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "brand";
  size?: "default" | "sm" | "lg";
  asChild?: boolean; // Note: limited support without Radix Slot
}

interface Strike {
  x: number;
  y: number;
  key: number;
}

export const DemolitionButton = forwardRef<HTMLButtonElement, DemolitionButtonProps>(
  ({
    children,
    variant = "primary",
    size = "default",
    onClick,
    className,
    disabled = false,
    asChild,
    ...props
  }, ref) => {
    const [strike, setStrike] = useState<Strike | null>(null);
    const internalRef = useRef<HTMLButtonElement>(null);
    const activeRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Respect reduced motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        onClick?.(e);
        return;
      }

      const rect = activeRef.current!.getBoundingClientRect();
      setStrike({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        key: Date.now(),
      });

      setTimeout(() => setStrike(null), 500);

      onClick?.(e);
    };

    const baseClasses = cn(
      "relative overflow-hidden inline-flex items-center justify-center transition-all duration-200",
      "font-bold rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2",
      
      // Variants
      variant === "primary" && "bg-brand-red text-white hover:bg-brand-red-dark border-2 border-brand-red",
      variant === "brand" && "bg-brand-red text-white hover:bg-brand-red-dark border-2 border-brand-red",
      variant === "secondary" && "bg-white text-brand-gray-900 border-2 border-brand-gray-300 hover:border-brand-red",
      
      // Sizes
      size === "default" && "h-12 px-6 py-2 text-sm",
      size === "sm" && "h-10 px-4 text-sm",
      size === "lg" && "h-14 px-8 text-base",
      
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    return (
      <motion.button
        {...(props as any)}
        ref={activeRef}
        onClick={handleClick}
        whileTap={!disabled ? { y: 4 } : {}}
        transition={{ duration: 0.08, ease: "easeOut" }}
        className={baseClasses}
        disabled={disabled}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>

        <AnimatePresence>
          {strike && (
            <DemolitionEffect 
              key={strike.key} 
              x={strike.x} 
              y={strike.y} 
              variant={variant === "secondary" ? "secondary" : "primary"} 
            />
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

DemolitionButton.displayName = "DemolitionButton";

function DemolitionEffect({ 
  x, 
  y, 
  variant 
}: { 
  x: number; 
  y: number; 
  variant: "primary" | "secondary" 
}) {
  const color = variant === "primary" ? "white" : "var(--color-brand-red)";
  
  return (
    <>
      <FlashLayer color={color} />
      <CrackLayer x={x} y={y} color={color} />
      <DustLayer x={x} y={y} color={color} />
    </>
  );
}

function FlashLayer({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 0.2, times: [0, 0.3, 1], ease: "easeOut" }}
    />
  );
}

function CrackLayer({ x, y, color }: { x: number; y: number; color: string }) {
  const cracks = [
    { angle: 0, length: 50 },
    { angle: 60, length: 45 },
    { angle: 120, length: 40 },
    { angle: 180, length: 50 },
    { angle: 240, length: 45 },
    { angle: 300, length: 40 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {cracks.map((c, i) => {
        const rad = (c.angle * Math.PI) / 180;
        const midX = x + Math.cos(rad) * c.length * 0.5 + (Math.random() - 0.5) * 8;
        const midY = y + Math.sin(rad) * c.length * 0.5 + (Math.random() - 0.5) * 8;
        const endX = x + Math.cos(rad) * c.length;
        const endY = y + Math.sin(rad) * c.length;
        const d = `M ${x} ${y} L ${midX} ${midY} L ${endX} ${endY}`;

        return (
          <motion.path
            key={i}
            d={d}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
            transition={{
              pathLength: { duration: 0.18, delay: i * 0.015, ease: "easeOut" },
              opacity: { duration: 0.4, delay: i * 0.015, times: [0, 0.3, 1] },
            }}
          />
        );
      })}
    </svg>
  );
}

function DustLayer({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
    const distance = 20 + Math.random() * 15;
    return {
      key: i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      size: 2 + Math.random() * 2,
    };
  });

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            translateX: "-50%",
            translateY: "-50%",
            backgroundColor: color,
          }}
          initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
