
export const fetcherSWR = async (url: string) => {
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }
  const data = await response.json();
  return data;
};