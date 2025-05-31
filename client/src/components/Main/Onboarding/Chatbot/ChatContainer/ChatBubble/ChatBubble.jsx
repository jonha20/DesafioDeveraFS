import React from 'react';


const ChatBubble = ({ isUser, message }) => {
  return (
    <div className={`bubble-container ${isUser ? 'user' : 'bot'}`}>
      {!isUser && <div className="avatar-bot">d.</div>}
      
      <div className="bubble">
        <p>{message}</p>
      </div>

      {isUser && <div className="avatar-user">👤</div>}
    </div>
  );
};

export default ChatBubble;