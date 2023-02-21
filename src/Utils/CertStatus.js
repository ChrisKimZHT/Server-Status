import axios from 'axios';

export const certStatus = async (domain) => {
  const response = await axios.get(`http://127.0.0.1:5000/?domain=${domain}`, { timeout: 10000 });
  return response.data;
}