import { useEffect, useState } from 'react';
import { getTeamsRequest } from '../services/api';

export function useGetTeams() {
  const [teams, setTeams] = useState([]);

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await getTeamsRequest();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { teams };
}
