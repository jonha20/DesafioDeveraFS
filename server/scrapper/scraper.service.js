const axios = require('axios');
const cheerio = require('cheerio');

const scrapeProducts = async (website) => {
  try {
    console.log(`Starting scraping for ${website}`);

    const { data: html } = await axios.get(website);
    const $ = cheerio.load(html);

    const products = [];

    $('.grid__item').each((index, element) => {
      const productName = $(element).find('.full-unstyled-link').text().trim();
      const href = $(element).find('a').attr('href');

      if (productName && href) {
        products.push({
          productName: productName,
          href: href.startsWith('http') ? href : `${website}${href}`
        });
      }
    });

    console.log('Extracted products:', products);

    return products;

  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  }
};

module.exports = { scrapeProducts };