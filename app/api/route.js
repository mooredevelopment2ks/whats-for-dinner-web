const options = {
  headers: {
    'accept': "application/json",
    'Authorization': `${process.env.NEXT_PUBLIC_FSQR_KEY}`,
    'X-Places-Api-Version': '2025-02-05'
  }
};

const getDinnerUrl = (latitude, longitude, category) => {
  // Default in case it can't find anything.
  const lat = latitude || '0';
  const long = longitude || '0';
  const cate = category || '13000';

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
    if(!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error(`Foursquare API Error (${apiResponse.status}):`, errorData);
      return Response.json({ results: [], error: `API failed with status ${apiResponse.status}` }, { status: 200 });
    }
    const data = await apiResponse.json()
    return Response.json(data)
  } catch(error) {
    console.error("Server-side fetching error:", error);

    return Response.json({ results: [], error: 'Internal Server Error during fetch' }, { status: 500 });
  }
}
