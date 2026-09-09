import { GradientText } from "@/components/monta-ui/gradient-text";

export default function Example() {
  return (
    <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
      <GradientText duration={6}>Ideias ganham cor.</GradientText>
    </h2>
  );
}
