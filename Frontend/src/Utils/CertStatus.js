import axios from 'axios';

export const certStatus = async (domain) => {
  const response = await axios.get(`${window.Config.certAPI}?domain=${domain}`, { timeout: 10000 });
  return response.data;
}