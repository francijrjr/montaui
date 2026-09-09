"use client";

import * as React from "react";

export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto a exibir, sem marcação interna. */
  children: string;
  /** Cor base CSS. @default "#753399" */
  color?: string;
  /** Cor da faixa de brilho. @default "#e9d5ff" */
  highlightColor?: string;
  /** Duração de um ciclo em segundos. Mínimo 0.1. @default 3 */
  duration?: number;
  /** Pausa o movimento na posição atual. @default false */
  paused?: boolean;
}

const css = `
@keyframes monta-text-shimmer { from { background-position: 100% center; } to { background-position: -100% center; } }
.monta-shimmer-text { color: var(--monta-base,#753399); }
@supports (background-clip: text) or (-webkit-background-clip: text) {
  .monta-shimmer-text { background-image: linear-gradient(110deg,var(--monta-base) 35%,var(--monta-highlight) 50%,var(--monta-base) 65%); background-size: 200% auto; background-clip: text; -webkit-background-clip: text; color: transparent; animation: monta-text-shimmer var(--monta-duration,3s) linear infinite; animation-play-state: var(--monta-play,running); }
}
@media (prefers-reduced-motion: reduce) { .monta-shimmer-text { animation: none; background: none; color: var(--monta-base); } }
@media (forced-colors: active) { .monta-shimmer-text { background: none; color: CanvasText; } }
`;

export const ShimmerText = React.forwardRef<HTMLSpanElement, ShimmerTextProps>(
  function ShimmerText(
    {
      children,
      color = "#753399",
      highlightColor = "#e9d5ff",
      duration = 3,
      paused = false,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const seconds = Number.isFinite(duration) ? Math.max(0.1, duration) : 3;
    return (
      <span
        {...props}
        ref={ref}
        className={["monta-shimmer-text", className].filter(Boolean).join(" ")}
        style={
          {
            "--monta-base": color,
            "--monta-highlight": highlightColor,
            "--monta-duration": `${seconds}s`,
            "--monta-play": paused ? "paused" : "running",
            ...style,
          } as React.CSSProperties
        }
      >
        <style>{css}</style>
        {children}
      </span>
    );
  },
);
