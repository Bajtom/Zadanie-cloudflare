export async function onRequestGet({env, request}) {

    const key = env.WEATHER_KEY.replace(' ', '');

    const params = (new URL(request.url)).searchParams;

    const len = params.get('len');
    const lat = params.get('lat');

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${len}&appid=${key}&units=metric`
    const res = await fetch(url);
    const weather = await res.json();

    return new Response(JSON.stringify(weather), { 
        headers: { 
            'content-type': 'application/json' 
        } 
    });
}
