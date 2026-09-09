import { AnimatedGradient } from "@/components/monta-ui/animated-gradient";

export default function Example() {
  return (
    <AnimatedGradient
      preset="brand"
      duration={12}
      style={{
        padding: "4rem 2rem",
        borderRadius: 24,
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>Uma nova perspectiva.</h2>
      <p>Seu conteúdo continua selecionável e interativo.</p>
    </AnimatedGradient>
  );
}
