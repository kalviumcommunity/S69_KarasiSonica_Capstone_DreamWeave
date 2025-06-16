import React from "react";

const DreamAnalytics = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-indigo-100 px-6 py-4">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700">
            Dream Analytics
          </h2>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-600 text-lg font-medium">
            This feature is under development and will be available soon.
            Stay tuned for updates!
          </p>
          <div className="mt-6">
            <svg
              className="mx-auto h-12 w-12 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamAnalytics;