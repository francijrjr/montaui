import { ShimmerText } from "@/components/monta-ui/shimmer-text";

export default function Example() {
  return (
    <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
      <ShimmerText color="#753399" highlightColor="#e9d5ff" duration={3}>
        O próximo detalhe importa.
      </ShimmerText>
    </h2>
  );
}
