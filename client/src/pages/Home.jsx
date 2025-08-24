
import About from "./About";
import FAQs from "./FAQ";
import FeaturesSection from "./FeaturesSection";
import FeedbackSection from "./FeedbackSection";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <StatsSection />
      <FeaturesSection />
      <FeedbackSection />
      <FAQs />
    </>
  );
}
