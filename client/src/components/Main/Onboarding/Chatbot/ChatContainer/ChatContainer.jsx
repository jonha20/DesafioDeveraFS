import React from 'react';


const ChatContainer = ({ children }) => {
  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        {children}
      </div>
    </div>
  );
};

export default ChatContainer;