import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import ChatWindow from './components/ChatWindow';
import Conversations from './components/Conversations';
import { fetchTranslation } from './services/translationService';
import './App.css';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [model, setModel] = useState('defaultModel');
  
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(1);

  
  useEffect(() => {
    const storedConversations = localStorage.getItem('conversations');
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleSendMessage = async (messageText) => {
    const userMessage = { text: messageText, sender: 'user' };

    setConversations(prevConversations => {
      const updatedConversations = prevConversations.map(convo => {
        if (convo.id === activeConversationId) {
          return {
            ...convo,
            messages: [
              ...(convo.messages || []),
              userMessage
            ]
          };
        }
        return convo;
      });

      
      const translatedMessage = fetchTranslation(messageText, sourceLanguage, targetLanguage, model);

      
      setTimeout(async () => {
        const translatedText = await translatedMessage;
        setConversations(prevConversations => prevConversations.map(convo => {
          if (convo.id === activeConversationId) {
            return {
              ...convo,
              messages: [
                ...(convo.messages || []),
                { text: translatedText, sender: 'bot' }
              ]
            };
          }
          return convo;
        }));
      }, 1000);

      return updatedConversations;
    });
  };

  const handleNewConversation = () => {
    const newConversationId = conversations.length + 1;
    const newConversation = {
      id: newConversationId,
      name: `Conversation ${newConversationId}`,
      messages: [],
    };

    setConversations(prevConversations => [...prevConversations, newConversation]);
    setActiveConversationId(newConversationId); 
  };

  const activeConversation = conversations.find(convo => convo.id === activeConversationId);

  return (
    <div className="app-container">
      <header>
        <h1>MaiBasira</h1>
        <div className="header-controls">
          <LanguageSelector 
            sourceLanguage={sourceLanguage} 
            setSourceLanguage={setSourceLanguage} 
            targetLanguage={targetLanguage} 
            setTargetLanguage={setTargetLanguage}
            model={model}
            setModel={setModel}
          />
        </div>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <Conversations 
            conversations={conversations} 
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
            setConversations={setConversations}  
            onNewConversation={handleNewConversation} 
          />
        </div>
        <div className="chat-container">
          {activeConversation && (
            <ChatWindow 
              messages={activeConversation.messages || []} 
              onSendMessage={handleSendMessage} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
