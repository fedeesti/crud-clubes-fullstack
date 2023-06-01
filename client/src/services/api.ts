import axios from 'axios';

const URL_API_BASE: string = 'http://localhost:3000/api/v1';

export async function getTeams(url: string) {
  try {
    const response = await axios.get(`${URL_API_BASE}${url}`);

    return response;
  } catch (err) {
    throw new Error('Cannot find teams, please try at another time');
  }
}
