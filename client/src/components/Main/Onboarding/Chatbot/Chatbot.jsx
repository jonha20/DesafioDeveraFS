import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './ChatContainer/ChatBubble/ChatBubble';
import ChatContainer from './ChatContainer/ChatContainer';
import InputBox from './ChatContainer/InputBox/InputBox';


const Chatbot = () => {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [availableFiles, setAvailableFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sales, setSales] = useState('');

  useEffect(() => {
    if (step === 2) {
      axios.get(`http://localhost:5001/api/onboarding/files?website=${website}`)
        .then(res => setAvailableFiles(res.data.files));
    }
  }, [step, website]);

  const handleFileToggle = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleUserInput = async (input) => {
    if (step === 1) {
      setWebsite(input);
      await axios.post('http://localhost:5001/api/onboarding/website', { website: input });
      setStep(2);
    } 
    else if (step === 2) {
      // para simplificar, dejamos que escriba los nombres de los archivos seleccionados
      const files = input.split(',').map(f => f.trim());
      setSelectedFiles(files);
      await axios.post('http://localhost:5001/api/onboarding/files', { selectedFiles: files });
      setStep(3);
    } 
    else if (step === 3) {
      setSales(input);
      await axios.post('http://localhost:5001/api/onboarding/sales', { sales: input });
      setStep(4);
    }
  };

  return (
    <ChatContainer>
      
      {step === 1 && (
        <div>
          <ChatBubble isUser={false} message="¡Bienvenido! Soy el asistente de Devera. Dime la web de tu empresa." />
          {website && <ChatBubble isUser={true} message={website} />}
        </div>
      )}

      {step === 2 && (
        <div>
          <ChatBubble isUser={false} message="Hemos encontrado estos archivos de tus productos:" />
          <ul>
            {availableFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
          {selectedFiles.length > 0 && 
            <ChatBubble isUser={true} message={`Archivos seleccionados: ${selectedFiles.join(", ")}`} />
          }
        </div>
      )}

      {step === 3 && (
        <div>
          <ChatBubble isUser={false} message="Indica el % de ventas por país" />
          {sales && <ChatBubble isUser={true} message={`${sales}% de ventas`} />}
        </div>
      )}

      {step === 4 && (
        <div>
          <ChatBubble isUser={false} message="Perfecto. Ahora completa el formulario de Tally para terminar." />
          <a href="https://tally.so/r/wL592l" target="_blank" rel="noopener noreferrer">
            Ir al formulario
          </a>
          <ChatBubble isUser={false} message="Onboarding finalizado." />
        </div>
      )}

      {/* Input general abajo */}
      <InputBox onSend={handleUserInput} />
      
    </ChatContainer>
  );
};

export default Chatbot;