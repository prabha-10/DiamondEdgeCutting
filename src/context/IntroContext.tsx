"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface IntroContextType {
  introComplete: boolean;
  markIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextType>({
  introComplete: true,
  markIntroComplete: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(true);

  const markIntroComplete = useCallback(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setIntroComplete(true)));
  }, []);

  return (
    <IntroContext.Provider value={{ introComplete, markIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
