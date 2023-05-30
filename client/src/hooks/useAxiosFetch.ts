import { useEffect, useState } from 'react';
import { getAllTeams } from '../services/api';
import { Team } from '../types';

export function useAxiosFetch() {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchAllTeams = async () => {
    try {
      const { data } = await getAllTeams();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllTeams();
  }, []);

  return { teams };
}
