import { useState } from 'react';
import styles from "@/styles/chatbot.module.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Chatbot = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleMessages = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    const result = await model.generateContent(userMessage.text);

    const aiResponse = { text: `ZapBot: ${result.response.text()}`, sender: 'zapbot' };
    setMessages([...messages, userMessage, aiResponse]);

    setInput(''); 
  }

  return (
    <div className={styles.chatcontainer}>
      <div className={styles.chatbox}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === styles.user ? styles.usermessage : styles.botmessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputcontainer}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleMessages()}
          placeholder="Type a message..."
        />
        <button className={styles.button} onClick={handleMessages}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
