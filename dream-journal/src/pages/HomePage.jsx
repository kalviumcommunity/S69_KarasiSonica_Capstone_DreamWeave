import HeroSection from "../components/layouts/HeroSection";
import Testimonials from "../components/Testimonials";

const HomePage = ({ setShowAuthModal }) => {
  return (
    <>
      <HeroSection setShowAuthModal={setShowAuthModal} />
      <Testimonials />
    </>
  );
};

export default HomePage;