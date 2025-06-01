import React, { useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatContainer/ChatBubble/ChatBubble';
import ChatContainer from './ChatContainer/ChatContainer';
import InputBox from './ChatContainer/InputBox/InputBox';
import { useNavigate } from 'react-router-dom';



//  URL scraper desplegado en Railway
// const BASE_URL = 'https://generous-tenderness-scrapper-app.up.railway.app';
const BASE_URL = 'http://localhost:8000'; // Pon aquí tu endpoint real si estás en deploy

const Chatbot = () => {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [loadingScraping, setLoadingScraping] = useState(false);
  const [products, setProducts] = useState([]); // Solo para guardar el JSON, no para mostrar
  const navigate = useNavigate();

  const handleUserInput = async (input) => {
    if (step === 1) {
      setWebsite(input);
      setLoadingScraping(true);

      try {
        const response = await axios.post(`${BASE_URL}/scrapear`, { url: input });
        console.log('Extracted products:', response.data);
        setProducts(response.data); // Aquí queda guardado el JSON completo
        setStep(2);
      } catch (error) {
        console.error('Scraping error:', error);
      } finally {
        setLoadingScraping(false);
      }
    }
  };

  console.log(products);
  

  const handleStartForm = () => {
    navigate('/form');
  };

  return (
    <ChatContainer>
      {step === 1 && (
        <div>
          <ChatBubble isUser={false} message="¡Bienvenido! Soy el asistente de Devera. Por favor, introduce la web de tu empresa:" />
          {website !== '' && (
            <ChatBubble isUser={true} message={website} />
          )}
          {loadingScraping && <ChatBubble isUser={false} message="Procesando la web, iniciando scraping..." />}
        </div>
      )}

      {step === 2 && (
        <div>
          <ChatBubble isUser={false} message="Perfecto. Mientras tanto, por favor, completa el siguiente formulario:" />
          <button onClick={handleStartForm}>Comenzar</button>
        </div>
      )}

      <InputBox onSend={handleUserInput} />
    </ChatContainer>
  );
};

export default Chatbot;