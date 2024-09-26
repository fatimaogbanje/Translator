import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow({ messages, onSendMessage }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.lang = 'en-US'; 
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript); 
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const handleSend = (messageText) => {
    if (messageText.trim()) {
      onSendMessage(messageText); 
      setCurrentMessage(''); 
      setIsTyping(true); 

      
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      const utterance = new SpeechSynthesisUtterance(messageText);
      window.speechSynthesis.speak(utterance);
    }
  };

  
  const handleVoiceInput = () => {
    if (recognition.current) {
      recognition.current.start(); 
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {/* <div className="avatar">
              <img
                src={message.sender === 'user' ? '/user-avatar.png' : '/bot-avatar.png'}
                alt={`${message.sender} avatar`}
              />
            </div> */}
            <div className="text-bubble">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input 
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' ? handleSend(currentMessage) : null}
        />
        <button onClick={handleVoiceInput}>🎤</button>
        <button className='sbutton' onClick={() => handleSend(currentMessage)}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
