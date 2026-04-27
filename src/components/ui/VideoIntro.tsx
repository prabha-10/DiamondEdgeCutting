"use client";

import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    // Lock scroll for the duration of the intro
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setExiting(true);

      const removeTimer = setTimeout(() => {
        document.body.style.overflow = "";
        setGone(true);
        if (!calledRef.current) {
          calledRef.current = true;
          onComplete();
        }
      }, 900); // match transition duration

      return () => clearTimeout(removeTimer);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
        transition: "opacity 900ms cubic-bezier(0.4,0,0.2,1), transform 900ms cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <video
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* subtle bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
