
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-6">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 text-center">
          About DreamWeave
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          DreamWeave was built to empower dreamers to explore their subconscious mind and unlock deeper self-understanding through innovative dream journaling.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to create a safe, inspiring, and insightful platform where people can record, track, and analyze their dreams. With the help of AI tools and a strong community, DreamWeave helps you make sense of the stories your mind tells while you sleep.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you're curious about dream meanings, want to track recurring patterns, or simply love documenting your thoughts, DreamWeave is here to guide your journey into the dream world.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
