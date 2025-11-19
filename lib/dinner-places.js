const getDinnerUrl = (latitude, longitude, category) => {
  return `https://whats-for-dinner-web.vercel.app/api?latitude=${latitude}&longitude=${longitude}&category=${category}`;
};
export const fetchDinnerPlaces = async (latitude, longitude, category) => {
  const url = getDinnerUrl(latitude, longitude, category);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error(error);
  }
};
