import { useState } from 'react';
import styles from "@/styles/chatbot.module.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulating bot response
    const botMessage = { text: `Bot: ${input}`, sender: 'bot' };
    setMessages([...messages, userMessage, botMessage]);

    setInput('');
  };

  return (
    <div className={styles.chatcontainer}>
      <div className={styles.chatbox}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === styles.user ? styles.user-message : styles.bot-message}>
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button className={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
