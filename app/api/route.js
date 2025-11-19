const options = {
  headers: {
    "accept": "application/json",
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_FSQR_KEY}`,
    "X-Places-Api-Version": "2025-02-05"
  }
};

const getDinnerUrl = (latitude, longitude, category) => {
  // Default in case it can't find anything.
  const lat = latitude || '0';
  const long = longitude || '0';
  const cate = category || '4bf58dd8d48988d16e941735';

  return `https://places-api.foursquare.com/places/search?ll=${lat}%2C${long}&radius=10000&categories=${cate}&fields=name%2Clocation%2Ctel%2Cwebsite%2Chours%2Crating%2Cprice%2Cphotos&open_now=true&sort=DISTANCE&limit=10`;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = getDinnerUrl(
    searchParams.get("latitude"), 
    searchParams.get("longitude"), 
    searchParams.get("category")
  );
  try{
    const apiResponse = await fetch(url, options);
    const data = await apiResponse.json();
    if(!apiResponse.ok) {
      return new Response(
        JSON.stringify({ results: [], error: `API failed with status ${apiResponse.status}` }),
        {
          status: apiResponse.status,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ results: [], error: 'Internal Server Error during fetch' }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, X-Places-Api-Version, Content-Type, Accept",
    }
  });
}
