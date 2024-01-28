import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
  xxxl: 2000,
};

const findCurrentBreakpoint = (width) => {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints.xxl) return 'xl';
  if (width < breakpoints.xxxl) return 'xxl';
  return 'xxxl';
};

export default function useBreakpoint(callback) {
  const [breakpoint, setBreakpoint] = useState(findCurrentBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const currentBreakpoint = findCurrentBreakpoint(window.innerWidth);
      if (currentBreakpoint !== breakpoint) {
        setBreakpoint(currentBreakpoint);
        if (callback && typeof callback === 'function') {
          callback(currentBreakpoint);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup: Remove the resize event listener
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, callback]);

  return breakpoint;
}
