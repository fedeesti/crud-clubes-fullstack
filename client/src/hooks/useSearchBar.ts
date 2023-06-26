import { useEffect, useRef, useState } from 'react';
import { Team } from '../types';
import { useGetTeams } from './useGetTeams';

export function useSearchBar() {
  const { teams }: { teams: Team[] } = useGetTeams();
  const [filteredTeam, setFilteredTeam] = useState<Team[]>([]);
  const [keyTeam, setKeyTeam] = useState<string>('');

  const refSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    const result = teams.filter((team: Team) => {
      if (target.value.trim() === '') return filteredTeam;

      return team.name.toLowerCase().includes(target.value.toLowerCase());
    });

    setFilteredTeam(result);
    setKeyTeam(target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!refSearch.current?.contains(e.target as Node)) {
      setFilteredTeam([]);
      setKeyTeam('');
    }
  };

  const resetFilteredTeam = () => {
    setFilteredTeam([]);
    setKeyTeam('');
  };

  return {
    filteredTeam,
    handleChange,
    keyTeam,
    handleClickOutside,
    refSearch,
    resetFilteredTeam,
  };
}
