import {useEffect, useState} from 'react';
import {Person} from '../types/types';

const useGetPeople = (
  pageNumber: number,
): {
  isLoading: boolean;
  data: Person;
  error: Error | null;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Person[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${pageNumber}`,
        );
        const json: Person[] = await response.json();
        setData(json);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  return {isLoading, data, error};
};

export default useGetPeople;
