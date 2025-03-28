import React from "react";

const HeroSection = ({ setShowAuthModal }) => (
  <div className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center"> {/* Center everything */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/03/36/68/0336687c2b69f83867908d0876f8414f.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.3,
      }}
    />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="max-w-4xl mx-auto"> {/* Centered content block */}
        <h1
          className="text-7xl font-bold bg-gradient-to-r from-violet-900 to-indigo-900 bg-clip-text text-transparent mb-8 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Capture Your Dreams, Unlock Your Mind
        </h1>
        <p
          className="text-xl text-gray-600 mb-10 leading-relaxed font-light"
          style={{ fontFamily: "'Monomakh', serif" }}
        >
          Transform your nightly adventures into meaningful insights.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-10 py-5 text-lg
                     hover:scale-105 hover:opacity-90 transition-all duration-300 ease-out shadow-md shadow-violet-300"
          style={{ fontFamily: "'Pacifico', serif" }}
        >
          Start Your Dream Journey
        </button>
      </div>
    </div>
  </div>
);

export default HeroSection;
