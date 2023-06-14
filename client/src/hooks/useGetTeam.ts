import { useState, useEffect } from 'react';
import { getTeamRequest } from '../services/api';
import { Team } from '../types';

export default function useGetTeam(id: string | undefined) {
  const [team, setTeam] = useState<Team>();

  const getTeam = async (id: string | undefined) => {
    const { data } = await getTeamRequest(id);
    setTeam(data);
  };

  useEffect(() => {
    getTeam(id);
  }, [id]);

  return { team };
}
