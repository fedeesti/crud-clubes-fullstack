import { useEffect, useRef, useState } from 'react';

export function useNavbarExpanded() {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const menuRef: React.RefObject<any> = useRef();
  const searchMobileRef: React.RefObject<any> = useRef();

  const toggleMenuExpanded = () => {
    setIsMenuExpanded(!isMenuExpanded);
    setIsSearchExpanded(false);
  };

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const hideNavbarExpanded = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node)) {
      setIsMenuExpanded(false);
    }

    if (!searchMobileRef.current?.contains(e.target as Node)) {
      setIsSearchExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', hideNavbarExpanded);

    return () => {
      document.removeEventListener('mousedown', hideNavbarExpanded);
    };
  });

  return { isMenuExpanded, isSearchExpanded, toggleMenuExpanded, toggleSearchExpanded, menuRef, searchMobileRef };
}
