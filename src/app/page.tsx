import Header from "@/components/Header";
import Services from "@/components/Service";
import WhyChooseUs from "@/components/WhyChooseUs";
import Mission from "@/components/Mission";
import Clients from "@/components/Client";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";

const DynamicHero = dynamic(() => import("@/components/Hero"), {
  loading: () => <Loading />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <DynamicHero />
      <Services />
      <WhyChooseUs />
      <Mission />
      <Clients />
      <About />
      <Footer />
    </main>
  );
}
