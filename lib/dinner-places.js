const getDinnerUrl = (latitude, longitude, category) => {
  return `/api?latitude=${latitude}&longitude=${longitude}&category=${category}`;
};
export const fetchDinnerPlaces = async (latitude, longitude, category) => {
  const url = getDinnerUrl(latitude, longitude, category);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
};
