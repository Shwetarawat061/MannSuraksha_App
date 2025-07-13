import React, { useState } from 'react';
import './MannSurakshaApp.css';

export default function MannSurakshaApp() {
  const [screen, setScreen] = useState('onboarding');
  const [mood, setMood] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [journal, setJournal] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmitMood = () => {
    const detectedMood = textInput.includes('sad') ? 'Stressed' : 'Happy';
    setMood(detectedMood);
    setScreen('moodFeedback');
  };

  const handleChatSubmit = (msg) => {
    setChat([...chat, { from: 'user', msg }, { from: 'bot', msg: 'Take a deep breath. You got this! 💪' }]);
  };

  return (
    <div className="app-container">
      {screen === 'onboarding' && (
        <div className="screen">
          <h1>Welcome to MannSuraksha</h1>
          <p>Your mental wellness companion 💚</p>
          <button onClick={() => setScreen('moodCheck')}>Get Started</button>
          <p className="link">Privacy Policy</p>
        </div>
      )}

      {screen === 'moodCheck' && (
        <div className="screen">
          <h2>Daily Mood Check-in</h2>
          <textarea placeholder="How are you feeling today?" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
          <button onClick={handleSubmitMood}>Submit</button>
        </div>
      )}

      {screen === 'moodFeedback' && (
        <div className="screen">
          <h2>Mood: {mood}</h2>
          <p>You're doing great! Here's a quick breathing exercise 💨</p>
          <button onClick={() => setScreen('journal')}>Reflect in Journal</button>
        </div>
      )}

      {screen === 'journal' && (
        <div className="screen">
          <h2>Journal Reflection</h2>
          <textarea placeholder="Write about your stress triggers or coping steps..." value={journal} onChange={(e) => setJournal(e.target.value)} />
          <button onClick={() => setScreen('tracker')}>Save</button>
        </div>
      )}

      {screen === 'tracker' && (
        <div className="screen">
          <h2>Mood Tracker</h2>
          <p>📅 Mood history and charts would be shown here (Mock UI)</p>
          <button onClick={() => setScreen('chatbot')}>Talk to Chatbot</button>
        </div>
      )}

      {screen === 'chatbot' && (
        <div className="screen">
          <h2>InnerPeace Chatbot</h2>
          <div className="chat-box">
            {chat.map((c, i) => (
              <p key={i}><strong>{c.from === 'user' ? 'You' : 'Bot'}:</strong> {c.msg}</p>
            ))}
          </div>
          <input type="text" placeholder="Ask something..." className="chat-input" onKeyDown={(e) => {
            if (e.key === 'Enter') handleChatSubmit(e.target.value);
          }} />
        </div>
      )}
    </div>
  );
}
