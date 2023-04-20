async function handleRequest(request) {
  const url = `https://newsapi.org/v2/top-headlines?country=us&page=${request.cf ? request.cf.colo : 1}&pageSize=10`;
  const apiKey = Deno.env.get("NEWS_API_KEY");

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

  return new Response(JSON.stringify(news), {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
