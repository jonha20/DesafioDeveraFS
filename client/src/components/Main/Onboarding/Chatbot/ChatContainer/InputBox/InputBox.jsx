import React, { useState } from 'react';
import { FaPaperclip, FaSmile, FaPaperPlane } from 'react-icons/fa';


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
        <FaPaperclip />
        <FaSmile />
        <FaPaperPlane onClick={handleSend} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default InputBox;