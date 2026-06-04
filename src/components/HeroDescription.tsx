import { Highlight } from "./ui/Highlight";

export default function HeroDescription() {
  return (
    <p className="hero-desc">
      Kami membangun{" "}
      <Highlight color="indigo">website profesional</Highlight>,
      sistem otomasi dengan{" "}
      <Highlight color="amber">n8n</Highlight>
      , dan integrasi{" "}
      <Highlight color="indigo">AI</Highlight>{" "}
      yang benar-benar bekerja untuk bisnis lokal Anda.
    </p>
  );
}
