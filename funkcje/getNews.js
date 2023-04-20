async function getNews(page, pageSize) {
  const url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}`;
  const apiKey = "<9ca41b3aaee0400dbb6434869dff69d4>";

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

  const json = await response.json();

  const news = json.articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url
  }));

  return news;
}

// przykładowe użycie
const news = await getNews(1, 10);
console.log(news);
