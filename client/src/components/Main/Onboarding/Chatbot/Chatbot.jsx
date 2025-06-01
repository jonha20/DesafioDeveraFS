import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './ChatContainer/ChatBubble/ChatBubble';
import ChatContainer from './ChatContainer/ChatContainer';
import InputBox from './ChatContainer/InputBox/InputBox';

// URL de la API
const BASE_URL = 'https://devera-ds.onrender.com';

const Chatbot = () => {
  const [step, setStep] = useState(1);
  const [website, setWebsite] = useState('');
  const [availableFiles, setAvailableFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sales, setSales] = useState('');
  const [loadingFiles, setLoadingFiles] = useState(false);

  useEffect(() => {
    if (step === 2) {
      setLoadingFiles(true);
      axios.get(`${BASE_URL}/scrapear?website=${website}`)
        .then(function (response) {
          console.log('Respuesta del scraper:', response.data.files);
          setAvailableFiles(response.data.files);
        })
        .catch(function (error) {
          console.log('Error en scrapear:', error);
        })
        .finally(function () {
          setLoadingFiles(false);
        });
    }
  }, [step, website]);

  const handleFileToggle = function (file) {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(function (f) { return f !== file; }));
    } else {
      setSelectedFiles(selectedFiles.concat(file));
    }
  };

  const handleUserInput = function (input) {
    if (step === 1) {
      setWebsite(input);
      axios.post(`${BASE_URL}/website`, { website: input })
        .then(function () {
          setStep(2);
        })
        .catch(function (error) {
          console.log('Error en website:', error);
        });
    }
    else if (step === 2) {
      var files = input.split(',');
      for (var i = 0; i < files.length; i++) {
        files[i] = files[i].trim();
      }
      setSelectedFiles(files);
      axios.post(`${BASE_URL}/files`, { selectedFiles: files })
        .then(function () {
          setStep(3);
        })
        .catch(function (error) {
          console.log('Error en files:', error);
        });
    }
    else if (step === 3) {
      setSales(input);
      axios.post(`${BASE_URL}/sales`, { sales: input })
        .then(function () {
          setStep(4);
        })
        .catch(function (error) {
          console.log('Error en sales:', error);
        });
    }
  };

  return (
    <ChatContainer>

      {step === 1 && (
        <div>
          <ChatBubble isUser={false} message="¡Bienvenido! Soy el asistente de Devera. Dime la web de tu empresa." />
          {website !== '' && (
            <>
              <ChatBubble isUser={true} message={website} />
              <ChatBubble isUser={false} message="Perfecto, voy a buscar los archivos de tu web." />
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <ChatBubble isUser={false} message="Estoy buscando los archivos de tu empresa..." />
          {loadingFiles && <ChatBubble isUser={false} message="Cargando archivos..." />}
          <ul>
            {availableFiles.map(function (file, index) {
              return <li key={index}>{file}</li>;
            })}
          </ul>
          {selectedFiles.length > 0 && <ChatBubble isUser={true} message={'Archivos seleccionados: ' + selectedFiles.join(", ")} />}
        </div>
      )}

      {step === 3 && (
        <div>
          <ChatBubble isUser={false} message="Indica el % de ventas por país" />
          {sales !== '' && (
            <>
              <ChatBubble isUser={true} message={sales + '% de ventas'} />
              <ChatBubble isUser={false} message="Perfecto, datos de ventas registrados." />
            </>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <ChatBubble isUser={false} message="Perfecto. Ahora completa el formulario de Tally para terminar." />
          <a href="https://tally.so/r/wL592l" target="_blank" rel="noopener noreferrer">
            Ir al formulario
          </a>
          <ChatBubble isUser={false} message=" Onboarding finalizado." />
        </div>
      )}

      <InputBox onSend={handleUserInput} />

    </ChatContainer>
  );
};

export default Chatbot;