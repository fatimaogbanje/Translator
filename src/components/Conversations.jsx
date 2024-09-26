import React from 'react';
import './Conversation.css'

function Conversations({ conversations, activeConversationId, setActiveConversationId, onNewConversation }) {
  const handleNewConversation = () => {
    onNewConversation(); 
  };

  return (
    <div>
      <div className="tabs">
        {conversations.map(convo => (
          <button
            key={convo.id}
            onClick={() => setActiveConversationId(convo.id)}
            className={convo.id === activeConversationId ? 'active' : ''}
          >
            {convo.name}
          </button>
        ))}
        <button className='new-conversation-button' onClick={handleNewConversation}>New Conversation</button>
      </div>
    </div>
  );
}

export default Conversations;
