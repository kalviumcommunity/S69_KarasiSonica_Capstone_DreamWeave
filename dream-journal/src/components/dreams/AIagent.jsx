import React, { useState } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';

const AIagent = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setAIResponse("");

    try {
      const response = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: userInput })
      });

      const data = await response.json();
      setAIResponse(data.response || "No response from AI.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAIResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Theme-based colors
  const backgroundColor = "#F8F8FF"; // GhostWhite
  const cardBackgroundColor = "#FFFFFF"; // White
  const inputBorderColor = "#D8BFD8"; // Thistle
  const inputFocusRingColor = "#A5C8E4"; // PaleCerulean
  const buttonGradient = "linear-gradient(to right, #4B0082, #8B008B)"; // Indigo to DarkMagenta
  const buttonTextColor = "#FFFFFF"; // White
  const responseBackgroundColor = "#F0FFF0"; // Honeydew
  const responseTextColor = "#333333"; // Dark Gray
  const shadowColor = "rgba(0, 0, 0, 0.1)"; // Soft Shadow
  const headingTextColor = "#4B0082"; // Indigo
  const subheadingTextColor = "#778899"; // LightSlateGray

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom, ${backgroundColor}, #FFFFFF)`
      }}
    >
      <div
        className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
        style={{
          backgroundColor: cardBackgroundColor,
          boxShadow: `0 15px 30px ${shadowColor}`,
          border: `1px solid ${inputBorderColor}`
        }}
      >
        <div className="bg-indigo-100 px-6 py-4">
          <h2 className="text-3xl font-extrabold text-center" style={{ color: headingTextColor }}>
            <MessageSquare color={headingTextColor} className="inline-block mr-2 mb-1" size={32} />
            DreamWeave AI Assistant
          </h2>
          <p className="mt-2 text-md text-center" style={{ color: subheadingTextColor }}>
            Unravel the mysteries of your dreams with AI
          </p>
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Ask me anything about your dreams..."
              className="p-5 border rounded-xl focus:outline-none"
              style={{
                borderColor: inputBorderColor,
                boxShadow: `0 0 0 2px ${inputFocusRingColor}`,
                fontSize: "1rem"
              }}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              onClick={handleQuery}
              className="text-white font-semibold py-4 rounded-xl transition duration-300 focus:outline-none focus:ring-4"
              style={{
                background: buttonGradient,
                color: buttonTextColor,
                fontSize: "1.1rem",
                boxShadow: `0 4px 6px ${shadowColor}`
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Thinking...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Ask AI
                  <Send className="ml-2" size={20} />
                </span>
              )}
            </button>
          </div>

          {aiResponse && (
            <div
              className="mt-8 p-5 rounded-xl"
              style={{
                backgroundColor: responseBackgroundColor,
                border: `1px solid ${inputBorderColor}`
              }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: headingTextColor }}>
                <MessageSquare color={headingTextColor} className="inline-block mr-2" size={24} />
                AI Response:
              </h3>
              <p className="text-gray-800 whitespace-pre-wrap" style={{ color: responseTextColor }}>
                {aiResponse}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIagent;