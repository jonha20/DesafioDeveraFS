import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="input-box">
      <input 
        type="text" 
        placeholder="Type a new message here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="icons">
        <img 
            src="/public/paperclip.svg" 
            alt="Attach" 
            width="24" 
            height="24" 
          />
        <img 
          src="/public/smile.svg" 
          alt="Smile" 
          width="24" 
          height="24" 
        />
        <img 
          src="/public/send.svg" 
          alt="Send" 
          width="24" 
          height="24" 
          style={{ cursor: 'pointer' }}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default InputBox;