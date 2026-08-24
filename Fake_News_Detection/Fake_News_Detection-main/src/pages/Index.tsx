import Hero from "@/components/Hero";
import AnalysisForm from "@/components/AnalysisForm";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AnalysisForm />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
