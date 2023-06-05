import axios, { AxiosResponse } from 'axios';

const URL_API_BASE: string = 'http://localhost:3000/api/v1/teams';

export async function getTeamsRequest(): Promise<AxiosResponse> {
  try {
    const response = await axios.get(URL_API_BASE);

    return response;
  } catch (err) {
    throw new Error('Cannot find teams, please try at another time');
  }
}

export async function getTeamRequest(id: string | undefined): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`${URL_API_BASE}/${id}`);
    return response;
  } catch (err) {
    throw new Error('ID is invalid or the team does not exist');
  }
}

export async function deleteTeamRequest(id: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`${URL_API_BASE}/${id}`);

    return response;
  } catch (err) {
    throw new Error('ID is invalid or the team does not exist');
  }
}
