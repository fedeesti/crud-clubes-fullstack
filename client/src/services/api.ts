import axios from 'axios';

export async function getAllTeams() {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/teams/');

    return response;
  } catch (err) {
    throw new Error('Cannot find teams, please try at another time');
  }
}
