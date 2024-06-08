import axios from 'axios';

export const fetchAccessToken = async () => {
  try {
    const response = await axios.get('https://flex-push.vercel.app/user/generate-token');
    return response.data.token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};