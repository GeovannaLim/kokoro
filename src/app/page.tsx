import { Nav } from "@/components/landing/Nav";
import {
  About,
  Assistant,
  FAQ,
  FinalCTA,
  Footer,
  Hero,
  Platform,
  Pricing,
  RealData,
  TrustStrip,
} from "@/components/landing/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Platform />
        <Assistant />
        <About />
        <RealData />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
