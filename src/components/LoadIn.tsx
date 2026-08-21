"use client";

import { useState, useEffect, useRef } from "react";

const LEFT_COL = ["K", "A", "T", "A"];
const RIGHT_COL = ["R", "I", "N", "A"];
const TYPE_INTERVAL = 160;
const HOLD_DURATION = 1800;
const EXIT_DURATION = 700;

export default function LoadIn({ onComplete }: { onComplete: () => void }) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const totalLetters = LEFT_COL.length + RIGHT_COL.length;
    let current = 0;

    const typeNext = () => {
      current++;
      setVisibleLetters(current);

      if (current < totalLetters) {
        setTimeout(typeNext, TYPE_INTERVAL);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete();
            }
          }, EXIT_DURATION);
        }, HOLD_DURATION);
      }
    };

    const startTimeout = setTimeout(typeNext, TYPE_INTERVAL);
    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d9d7d3",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(0.92)" : "scale(1)",
        transition: `all ${EXIT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <div className="flex gap-[4.5vw] items-center">
        {/* Left column — KATA */}
        <div className="flex flex-col items-center">
          {LEFT_COL.map((letter, i) => (
            <span
              key={`l-${i}`}
              className="font-display text-[clamp(80px,9vw,140px)] leading-[1.1] flex items-center justify-center"
              style={{
                color: "#00a7cd",
                opacity: i < visibleLetters ? 1 : 0,
                transition: "opacity 200ms ease",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Right column — RINA */}
        <div className="flex flex-col items-center">
          {RIGHT_COL.map((letter, i) => (
            <span
              key={`r-${i}`}
              className="font-display text-[clamp(80px,9vw,140px)] leading-[1.1] flex items-center justify-center"
              style={{
                color: "#00a7cd",
                opacity: i + LEFT_COL.length < visibleLetters ? 1 : 0,
                transition: "opacity 200ms ease",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
