"use client";

import * as React from "react";

export interface TextRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto revelado por palavras, preservando espaços e quebras de linha. */
  children: string;
  /** Tipo de entrada. @default "slide" */
  effect?: "slide" | "blur";
  /** Duração da entrada de cada palavra em segundos. @default 0.6 */
  duration?: number;
  /** Espera inicial em segundos. @default 0 */
  delay?: number;
  /** Intervalo entre palavras em segundos. @default 0.08 */
  stagger?: number;
}

const css = `
@keyframes monta-reveal-slide { from { opacity: 0; transform: translateY(.65em); } to { opacity: 1; transform: none; } }
@keyframes monta-reveal-blur { from { opacity: 0; filter: blur(8px); } to { opacity: 1; filter: blur(0); } }
.monta-text-reveal { white-space: pre-wrap; }
.monta-text-reveal .monta-reveal-word { display: inline-block; animation: var(--monta-effect,monta-reveal-slide) var(--monta-duration,.6s) both; animation-delay: var(--monta-word-delay,0s); }
.monta-text-reveal .monta-readable-text { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) { .monta-text-reveal .monta-reveal-word { animation: none; } }
`;

/** Anima uma vez ao montar. Para repetir, altere a key React. Não usa timers. */
export const TextReveal = React.forwardRef<HTMLSpanElement, TextRevealProps>(
  function TextReveal(
    {
      children,
      effect = "slide",
      duration = 0.6,
      delay = 0,
      stagger = 0.08,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const seconds = Number.isFinite(duration) ? Math.max(0.1, duration) : 0.6;
    const start = Number.isFinite(delay) ? Math.max(0, delay) : 0;
    const interval = Number.isFinite(stagger) ? Math.max(0, stagger) : 0.08;
    let wordIndex = 0;
    return (
      <span
        {...props}
        ref={ref}
        className={["monta-text-reveal", className].filter(Boolean).join(" ")}
        style={
          {
            "--monta-duration": `${seconds}s`,
            "--monta-effect":
              effect === "blur" ? "monta-reveal-blur" : "monta-reveal-slide",
            ...style,
          } as React.CSSProperties
        }
      >
        <style>{css}</style>
        <span className="monta-readable-text">{children}</span>
        <span aria-hidden="true">
          {children.split(/(\s+)/).map((part, index) => {
            if (!part || /^\s+$/.test(part)) return part;
            const wordDelay = start + wordIndex++ * interval;
            return (
              <span
                key={`${index}-${part}`}
                className="monta-reveal-word"
                style={
                  {
                    "--monta-word-delay": `${wordDelay}s`,
                  } as React.CSSProperties
                }
              >
                {part}
              </span>
            );
          })}
        </span>
      </span>
    );
  },
);
