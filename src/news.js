const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const getArticles = async (topic) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getTrendingArticles = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getCategoryArticles = async (category) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${category}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};
