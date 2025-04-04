import React from "react";



//testimonials cards
const testimonials = [
  { 
    name: "Emily Richardson", 
    role: "Creative Writer", 
    quote: "Dream Journal has transformed how I capture my dreams.", 
    image: "https://i.pinimg.com/474x/71/c8/58/71c85821c00db700eb386437d9b7cd1f.jpg" 
  },
  { 
    name: "Michael Anderson", 
    role: "Psychology Student", 
    quote: "As a psychology student, this app has been invaluable for research.", 
    image: "https://i.pinimg.com/474x/76/52/15/765215b08a88e95b82d63f54b07a0ce8.jpg" 
  },
  { 
    name: "Sarah Martinez", 
    role: "Mindfulness Coach", 
    quote: "I recommend Dream Journal to all my clients!", 
    image: "https://i.pinimg.com/474x/25/52/ba/2552ba5f117f13c3319250a82ad3bc55.jpg" 
  },
];

const Testimonials = () => (
  <div className="py-32 px-6 bg-gradient-to-b from-transparent via-white/80 to-white/50">
    <div className="max-w-7xl mx-auto">
      <h2
        className="text-5xl font-bold text-center mb-16"
        style={{ fontFamily: "'Monomakh', serif", color: "black" }}
      >
        What Dreamers Say About Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div 
            key={index} 
            className="bg-white/90 p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <p className="text-gray-600 text-sm">{t.role}</p>
            <p className="text-gray-700 italic my-4">{t.quote}</p>
            <img 
              src={t.image} 
              alt={`${t.name}'s testimonial`} 
              className="w-12 h-12 rounded-full border-2 border-black-600 mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);




export default Testimonials;
