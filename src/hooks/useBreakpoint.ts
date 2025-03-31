import { useState, useEffect } from 'react';

export function useBreakpoint(breakpoint: number) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(
    window.innerWidth >= breakpoint
  );

  useEffect(() => {
    function handleResize() {
      setIsAboveBreakpoint(window.innerWidth >= breakpoint);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isAboveBreakpoint;
}