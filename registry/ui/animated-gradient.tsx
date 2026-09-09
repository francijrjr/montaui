"use client";

import * as React from "react";

const presets = {
  brand: ["#35154a", "#753399", "#c084fc"],
  aurora: ["#082f49", "#0d9488", "#818cf8"],
  sunset: ["#701a75", "#e11d48", "#fbbf24"],
} as const;

export interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Paleta usada quando colors não é informado. @default "brand" */
  preset?: keyof typeof presets;
  /** Duas ou mais cores CSS; substitui preset. */
  colors?: readonly [string, string, ...string[]];
  /** Duração de um ciclo em segundos. Mínimo 0.1. @default 12 */
  duration?: number;
  /** Pausa o movimento na posição atual. @default false */
  paused?: boolean;
}

const css = `
@keyframes monta-gradient-pan { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.monta-animated-gradient { position: relative; isolation: isolate; overflow: hidden; }
.monta-animated-gradient > .monta-gradient-layer { position: absolute; inset: 0; z-index: -1; pointer-events: none; background-size: 300% 300%; animation: monta-gradient-pan var(--monta-duration,12s) ease-in-out infinite; animation-play-state: var(--monta-play,running); }
@media (prefers-reduced-motion: reduce) { .monta-animated-gradient > .monta-gradient-layer { animation: none; } }
`;

/** Fundo decorativo. Defina altura/padding e contraste do conteúdo no contêiner. */
export const AnimatedGradient = React.forwardRef<
  HTMLDivElement,
  AnimatedGradientProps
>(function AnimatedGradient(
  {
    preset = "brand",
    colors,
    duration = 12,
    paused = false,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const palette =
    colors && colors.length >= 2 ? colors : presets[preset] || presets.brand;
  const seconds = Number.isFinite(duration) ? Math.max(0.1, duration) : 12;
  return (
    <div
      {...props}
      ref={ref}
      className={["monta-animated-gradient", className]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--monta-duration": `${seconds}s`,
          "--monta-play": paused ? "paused" : "running",
          ...style,
        } as React.CSSProperties
      }
    >
      <style>{css}</style>
      <span
        aria-hidden="true"
        className="monta-gradient-layer"
        style={{
          backgroundImage: `linear-gradient(120deg, ${palette.join(", ")})`,
        }}
      />
      {children}
    </div>
  );
});
