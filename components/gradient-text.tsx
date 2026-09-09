"use client";

import * as React from "react";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto a exibir. Use dentro de h1/h2 para manter a semântica. */
  children: string;
  /** Duas ou mais cores CSS. @default ["#753399", "#c084fc", "#753399"] */
  colors?: readonly [string, string, ...string[]];
  /** Duração de um ciclo em segundos. Mínimo 0.1. @default 6 */
  duration?: number;
  /** Pausa o movimento na posição atual. @default false */
  paused?: boolean;
}

const css = `
@keyframes monta-text-gradient { to { background-position: 200% center; } }
.monta-gradient-text { color: #753399; }
@supports (background-clip: text) or (-webkit-background-clip: text) {
  .monta-gradient-text { background-image: var(--monta-text-colors); background-size: 200% auto; background-clip: text; -webkit-background-clip: text; color: transparent; animation: monta-text-gradient var(--monta-duration,6s) linear infinite; animation-play-state: var(--monta-play,running); }
}
@media (prefers-reduced-motion: reduce) { .monta-gradient-text { animation: none; } }
@media (forced-colors: active) { .monta-gradient-text { background: none; color: CanvasText; } }
`;

export const GradientText = React.forwardRef<
  HTMLSpanElement,
  GradientTextProps
>(function GradientText(
  {
    children,
    colors = ["#753399", "#c084fc", "#753399"],
    duration = 6,
    paused = false,
    className,
    style,
    ...props
  },
  ref,
) {
  const palette =
    colors.length >= 2 ? colors : ["#753399", "#c084fc", "#753399"];
  const seconds = Number.isFinite(duration) ? Math.max(0.1, duration) : 6;
  return (
    <span
      {...props}
      ref={ref}
      className={["monta-gradient-text", className].filter(Boolean).join(" ")}
      style={
        {
          "--monta-text-colors": `linear-gradient(90deg, ${palette.join(", ")})`,
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
});
