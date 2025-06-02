import React, { useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatContainer/ChatBubble/ChatBubble';
import ChatContainer from './ChatContainer/ChatContainer';
import InputBox from './ChatContainer/InputBox/InputBox';
import { useNavigate } from 'react-router-dom';

// URL scraper desplegado en Railway
const BASE_URL = 'https://generous-tenderness-scrapper-app.up.railway.app';
// const BASE_URL = 'http://localhost:8000'; // Pon aquí tu endpoint real si estás en deploy

const Chatbot = () => {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();

  const handleUserInput = async (input) => {
    if (step === 1) {
      setWebsite(input);

      // Lanzamos el scraping pero no esperamos su resultado
      axios.post(`${BASE_URL}/scrapear`, { url: input })
        .then((response) => {
          console.log('Extracted products:', response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Scraping error:', error);
        });

      // Pasamos al siguiente paso (mostrar mensaje + botón)
      setStep(2);
    }
  };

  const handleStartForm = () => {
    navigate('/form');
  };

  console.log(products);

  return (
    <ChatContainer>
      {step === 1 && (
        <div>
          <ChatBubble isUser={false} message="¡Bienvenido! Soy el asistente de Devera. Por favor, introduce la web de tu empresa:" />
          {website !== '' && (
            <ChatBubble isUser={true} message={website} />
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <ChatBubble isUser={false} message="Mientras analizamos tus productos, rellena el formulario para optimizar el proceso." />
          <button onClick={handleStartForm}>Comenzar</button>
        </div>
      )}

      <InputBox onSend={handleUserInput} />
    </ChatContainer>
  );
};

export default Chatbot;