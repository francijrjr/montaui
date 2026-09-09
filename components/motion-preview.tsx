import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import { AnimatedGradient } from "./animated-gradient";
import { GradientText } from "./gradient-text";
import { ShimmerText } from "./shimmer-text";
import { TextReveal } from "./text-reveal";

const names = [
  "animated-gradient",
  "gradient-text",
  "shimmer-text",
  "text-reveal",
];
const roots = new Map<HTMLElement, Root>();

function Playground({ name }: { name: string }) {
  const [paused, setPaused] = React.useState(false);
  const [duration, setDuration] = React.useState(
    name === "text-reveal" ? 0.6 : name === "animated-gradient" ? 12 : 3,
  );
  const [preset, setPreset] = React.useState<"brand" | "aurora" | "sunset">(
    "brand",
  );
  const [effect, setEffect] = React.useState<"slide" | "blur">("slide");
  const [replay, setReplay] = React.useState(0);
  const [text, setText] = React.useState("Ideias que ganham vida.");
  const controlId = React.useId();
  return (
    <div className="motion-playground">
      <div className="motion-stage">
        {name === "animated-gradient" ? (
          <AnimatedGradient
            preset={preset}
            duration={duration}
            paused={paused}
            className="motion-gradient-demo"
          >
            <span className="motion-eyebrow">MONTA UI / GRADIENTS</span>
            <h3>{text}</h3>
            <p>Cor, movimento e espaço para criar.</p>
          </AnimatedGradient>
        ) : (
          <h3>
            {name === "gradient-text" && (
              <GradientText duration={duration} paused={paused}>
                {text}
              </GradientText>
            )}
            {name === "shimmer-text" && (
              <ShimmerText duration={duration} paused={paused}>
                {text}
              </ShimmerText>
            )}
            {name === "text-reveal" && (
              <TextReveal key={replay} effect={effect} duration={duration}>
                {text}
              </TextReveal>
            )}
          </h3>
        )}
      </div>
      <div className="motion-controls">
        <label htmlFor={`${controlId}-text`}>
          Texto
          <input
            id={`${controlId}-text`}
            value={text}
            maxLength={100}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <label htmlFor={`${controlId}-duration`}>
          Duração: {duration}s
          <input
            id={`${controlId}-duration`}
            type="range"
            min={name === "text-reveal" ? 0.1 : 1}
            max={name === "text-reveal" ? 2 : 20}
            step={name === "text-reveal" ? 0.1 : 1}
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />
        </label>
        {name === "animated-gradient" && (
          <label htmlFor={`${controlId}-preset`}>
            Paleta
            <select
              id={`${controlId}-preset`}
              value={preset}
              onChange={(event) =>
                setPreset(event.target.value as typeof preset)
              }
            >
              <option value="brand">Monta</option>
              <option value="aurora">Aurora</option>
              <option value="sunset">Sunset</option>
            </select>
          </label>
        )}
        {name === "text-reveal" && (
          <label htmlFor={`${controlId}-effect`}>
            Efeito
            <select
              id={`${controlId}-effect`}
              value={effect}
              onChange={(event) => {
                setEffect(event.target.value as typeof effect);
                setReplay((value) => value + 1);
              }}
            >
              <option value="slide">Slide</option>
              <option value="blur">Blur</option>
            </select>
          </label>
        )}
        <button
          type="button"
          aria-pressed={name !== "text-reveal" ? paused : undefined}
          onClick={() =>
            name === "text-reveal"
              ? setReplay((value) => value + 1)
              : setPaused((value) => !value)
          }
        >
          {name === "text-reveal" ? "Repetir" : paused ? "Continuar" : "Pausar"}
        </button>
      </div>
      <p className="motion-note">
        Preview do componente React real. Movimento reduzido respeita a
        preferência do dispositivo.
      </p>
    </div>
  );
}

function Gallery() {
  return (
    <div className="motion-gallery">
      <a
        href="#/componente/animated-gradient"
        className="motion-gallery-gradient"
      >
        <AnimatedGradient
          style={{ height: "100%", padding: 32, color: "white" }}
        >
          <span className="motion-eyebrow">01 / ANIMATED GRADIENT</span>
          <h3>
            Uma nova
            <br />
            perspectiva.
          </h3>
          <span>Explorar gradientes ↗</span>
        </AnimatedGradient>
      </a>
      <a href="#/componente/gradient-text">
        <span className="motion-eyebrow">02 / GRADIENT TEXT</span>
        <h3>
          <GradientText>Ideias ganham cor.</GradientText>
        </h3>
        <span>Conhecer componente ↗</span>
      </a>
      <a href="#/componente/text-reveal">
        <span className="motion-eyebrow">03 / TEXT REVEAL</span>
        <h3>
          <TextReveal>Menos esforço. Mais expressão.</TextReveal>
        </h3>
        <span>Animar palavras ↗</span>
      </a>
      <a href="#/componente/shimmer-text" className="motion-gallery-shimmer">
        <span className="motion-eyebrow">04 / SHIMMER TEXT</span>
        <h3>
          <ShimmerText>Feito para se destacar.</ShimmerText>
        </h3>
        <span>Explorar o brilho ↗</span>
      </a>
    </div>
  );
}

const api = {
  names,
  unmount(element: HTMLElement) {
    roots.get(element)?.unmount();
    roots.delete(element);
  },
  mount(element: HTMLElement, name: string) {
    api.unmount(element);
    const root = createRoot(element);
    roots.set(element, root);
    root.render(<Playground name={name} />);
  },
  mountGallery(element: HTMLElement) {
    api.unmount(element);
    const root = createRoot(element);
    roots.set(element, root);
    root.render(<Gallery />);
  },
};
Object.assign(window, { MontaMotion: api });
