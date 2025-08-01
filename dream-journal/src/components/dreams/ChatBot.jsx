import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const qaPairs = [
    { question: "What can I do here?", answer: "🌟 Hehe! You're in DreamWeave land! Here you can log dreams, track moods, and explore your magical mind ✨" },
    { question: "How do I add a dream?", answer: "📓 Oh oh! Click the dreamy ‘+ Add Dream’ button, then just write your sleepy tale~ I’ll keep it safe 💤💖" },
    { question: "What is mood tracking?", answer: "😊 Moodies! You pick how you feel each day, and I draw you cute lil graphs! It helps understand your ups and downs!" },
    { question: "Where can I see past dreams?", answer: "🔍 Wanna stroll memory lane? Go to the dashboard! Your dreams are tucked like cozy pillows there 😴🪄" },
    { question: "Can you cheer me up?", answer: "🌈 Awww! Sending sparkles and marshmallow hugs your way!! 🐣✨ You're doing amazing, squishy friend 💪💖" },
    { question: "How does tagging work?", answer: "🏷️ Tag your dreams with moods like 'exciting' or 'weird' and I’ll help you sort and spot patterns like a pro-fairy! 🧚" },
    { question: "Love you Chibi", answer: "🥰 Eeeeeep! My circuits are blushing~ I love you more than all the dream bubbles in the universe 💗☁️" },
    { question: "Oops I got confused", answer: "😵 Oof! It’s okayyy! Take a breath, click 'Dashboard' or 'Add Dream', and I’ll guide you step by step! 🐾" },
    { question: "How do I edit a dream?", answer: "✏️ Just click the lil pencil icon on any dream card! I pinky promise it won’t bite~ 🎨" },
  ];

  const handleQuestionClick = (q, a) => {
    setMessages((prev) => [...prev, { question: q, answer: a }]);
    setShowQuestions(false);
  };

  const chibiBubbleStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '100px',
    height: '100px',
    background: 'url("https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg") center/contain no-repeat',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
  };

  const chatboxStyle = {
    position: 'fixed',
    bottom: '130px',
    right: '20px',
    width: '320px',
    maxHeight: '500px',
    backgroundColor: '#fff',
    border: '2px solid #ffc0f3',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 999,
    fontFamily: "'Comic Neue', cursive",
  };

  const chatMessagesStyle = {
    padding: '15px',
    overflowY: 'auto',
    flex: 1,
  };

  const inputBarStyle = {
    borderTop: '1px solid #ffd9fa',
    padding: '10px',
    background: '#fff0fb',
    cursor: 'text',
    borderRadius: '0 0 20px 20px',
  };

  const questionListStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff0fb',
    padding: '10px',
    maxHeight: '150px',
    overflowY: 'auto',
    borderTop: '1px solid #ffd9fa',
  };

  const questionButtonStyle = {
    backgroundColor: '#ffe6ff',
    border: '1px solid #ffb3ff',
    borderRadius: '10px',
    padding: '5px 10px',
    margin: '5px 0',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
  };

  const userMessage = {
    alignSelf: 'flex-end',
    backgroundColor: '#cce5ff',
    padding: '10px',
    borderRadius: '15px 15px 0 15px',
    marginBottom: '10px',
    maxWidth: '80%',
  };

  const chibiMessage = {
    alignSelf: 'flex-start',
    backgroundColor: '#ffe6f7',
    padding: '10px',
    borderRadius: '15px 15px 15px 0',
    marginBottom: '10px',
    maxWidth: '80%',
  };

  return (
    <>
      <button
        style={chibiBubbleStyle}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowQuestions(false);
        }}
        title="Talk to Chibi"
      />

      {isOpen && (
        <div style={chatboxStyle}>
          <div style={chatMessagesStyle}>
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div style={userMessage}><strong>You:</strong> {msg.question}</div>
                <div style={chibiMessage}><strong>Chibi:</strong> {msg.answer}</div>
              </div>
            ))}
          </div>

          <div
            style={inputBarStyle}
            onClick={() => setShowQuestions((prev) => !prev)}
          >
            ✨ Type something...
          </div>

          {showQuestions && (
            <div style={questionListStyle}>
              {qaPairs.map((pair, idx) => (
                <button
                  key={idx}
                  style={questionButtonStyle}
                  onClick={() => handleQuestionClick(pair.question, pair.answer)}
                >
                  {pair.question}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
