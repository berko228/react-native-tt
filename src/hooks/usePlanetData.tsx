import {useEffect, useState} from 'react';
import {Planet} from '../types/types';

const usePlanetData = (
  url: string,
): {
  planetData: Planet | null;
  loading: boolean;
  error: Error | null;
} => {
  const [planetData, setPlanetData] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlanetData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch planet data');
        }
        const data: Planet = await response.json();
        setPlanetData(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchPlanetData();
  }, []);

  return {planetData, loading, error};
};

export default usePlanetData;
