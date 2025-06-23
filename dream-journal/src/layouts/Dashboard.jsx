import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layouts/Footer'; // Adjust if needed

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 p-8 pt-24">
      
      {/* Centered content container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col min-h-screen">
        
        {/* Aesthetic Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text flex items-center justify-center gap-3 select-none">
             DreamWeave Dashboard
          </h1>
          <p className="text-lg text-gray-700 mt-3 max-w-xl mx-auto">
            Explore your dreams and gain insights at a glance
          </p>
          <div className="w-28 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-5 rounded-full shadow-md"></div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {/* Frosted Glass Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Link to="/add-dreams" className="group">
              <div className="flex items-center gap-5 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                <div className="text-5xl select-none">📝</div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Add Dreams</h2>
                  <p className="text-gray-700 opacity-90">Create new dreams and add them to your collection.</p>
                </div>
              </div>
            </Link>

            <Link to="/dream-list" className="group">
              <div className="flex items-center gap-5 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                <div className="text-5xl select-none">📋</div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Dream List</h2>
                  <p className="text-gray-700 opacity-90">View all your added dreams.</p>
                </div>
              </div>
            </Link>

            <Link to="/dream-analytics" className="group">
              <div className="flex items-center gap-5 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                <div className="text-5xl select-none">📊</div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Dream Analytics</h2>
                  <p className="text-gray-700 opacity-90">Analyze patterns in your dreams.</p>
                </div>
              </div>
            </Link>

            <Link to="/ai-agent" className="group">
              <div className="flex items-center gap-5 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                <div className="text-5xl select-none">🤖</div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">AI Agent</h2>
                  <p className="text-gray-700 opacity-90">Get insights and recommendations from an AI.</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Extra Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            <section className="p-6 bg-yellow-100 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-yellow-800 mb-3">🌟 Dream Tip</h3>
              <p className="text-yellow-700 leading-relaxed">
                Write your dreams down immediately after waking up to retain the most detail.
              </p>
            </section>
            <section className="p-6 bg-indigo-100 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-3">📊 Quick Stats</h3>
              <ul className="text-indigo-700 space-y-1 leading-relaxed list-disc list-inside">
                <li>Total Dreams: <strong>37</strong></li>
                <li>Lucid Dreams: <strong>12</strong></li>
                <li>Most Common Mood: <strong>Curious</strong></li>
              </ul>
            </section>
            <section className="p-6 bg-rose-100 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-rose-800 mb-3">🌌 Quote of the Day</h3>
              <blockquote className="text-rose-700 italic leading-relaxed">
                “Dreams are illustrations... from the book your soul is writing about you.” – Marsha Norman
              </blockquote>
            </section>
          </div>
        </main>
      </div>

      {/* FOOTER full width */}
      <footer className="w-full border-t border-gray-300 pt-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
