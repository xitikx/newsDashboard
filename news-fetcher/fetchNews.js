const fs = require("fs");
const axios = require("axios");
const path = require("path");
const config = {
  apiKey: process.env.NEWS_API_KEY,
  country: process.env.COUNTRY || 'us',
  category: process.env.CATEGORY || 'technology',
};

async function getNews() {
  const url = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&language=en&apiKey=${config.apiKey}`;

  try {
    const res = await axios.get(url);
    console.log(res.data);
    const newsData = res.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      url: article.url
    }));

    const outputPath = path.join(__dirname, "../frontend/news.json");
    fs.writeFileSync(outputPath, JSON.stringify(newsData, null, 2));

    console.log("✅ News fetched and written to frontend/news.json");
  } catch (err) {
    console.error("❌ Failed to fetch news:", err.message);
  }
}

getNews();
