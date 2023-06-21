import { useState } from 'react';

export function useNavbarExpanded() {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const toggleMenuExpanded = () => {
    setIsMenuExpanded(!isMenuExpanded);
    setIsSearchExpanded(false);
  };

  const toggleSearchExpanded = () => {
    setIsMenuExpanded(false);
    setIsSearchExpanded(!isSearchExpanded);
  };

  const hideNavbarExpanded = () => {
    setIsMenuExpanded(false);
    setIsSearchExpanded(false);
  };

  return { isMenuExpanded, isSearchExpanded, toggleMenuExpanded, toggleSearchExpanded, hideNavbarExpanded };
}
