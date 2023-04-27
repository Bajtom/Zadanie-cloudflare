export async function onRequestGet(context) {
  const params = (new URL(context.request.url)).searchParams;

    const page = params.get('pages');
    const pagessize = params.get('pagessize');
  const url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}`;
  const apiKey = context.env.API_KEY; // pobieramy klucz API z zmiennych środowiskowych

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
      "Content-Type": "application/json"
    }
  });
}

// funkcja eksportująca, którą będzie można wywołać z zewnątrz
// export default async function(request) {
//   const page = request.query.get("page") || 1;
//   const pageSize = request.query.get("pageSize") || 10;

//   const news = await getNews(page, pageSize);

//   return new Response(JSON.stringify(news), {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
// }
