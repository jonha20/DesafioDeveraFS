const fetch = require('node-fetch');
const fs = require('fs');

// URL de tu API
const apiUrl = 'http://localhost:8000/scrapear';

// Body de la petición
const payload = {
  url: 'https://saigucosmetics.com/collections/all-products'
};

async function scrapeAndSave() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();

    fs.writeFileSync('resultados_scraping.json', JSON.stringify(data, null, 2));
    console.log('Datos guardados en resultados_scraping.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

scrapeAndSave();