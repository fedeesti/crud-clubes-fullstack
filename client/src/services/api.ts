import axios, { AxiosResponse } from 'axios';
import { FormValues } from '../types';

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

export async function createTeamRequest(teamData: FormValues) {
  try {
    const response = await axios.post(URL_API_BASE, teamData);

    return response;
  } catch (err) {
    throw new Error('Creating a team is not possible at this time');
  }
}

export async function updateTeamRequest(id: string, fieldsToUpdate: FormValues): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`${URL_API_BASE}/${id}`, fieldsToUpdate);

    return response;
  } catch (err) {
    throw new Error('ID is invalid or the team does not exist');
  }
}
