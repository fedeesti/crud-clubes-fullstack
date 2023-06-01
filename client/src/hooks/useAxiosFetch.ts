import { useEffect, useState } from 'react';
import { getTeams } from '../services/api';

export function useAxiosFetch(url: string) {
  const [teams, setTeams] = useState([]);

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await getTeams(url);
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
