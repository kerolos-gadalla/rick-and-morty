import { gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";

const TEST_QUERY = gql`
  query Get_Characters($page: Int) {
    characters(page: $page) {
      info {
        count
        next
        prev
        pages
      }
      results {
        id
        name
      }
    }
  }
`;
type Character = {
  id: number;
  name: string;
};
type Info = {
  count: number;
  next: number;
  prev: number;
  pages: number;
};
type Characters = {
  info: Info;
  results: Character[];
};
export function useCharactersQuery() {
  const [fetchData, { data, loading }] =
    useLazyQuery<TEST_QUERY_TYPE>(TEST_QUERY);
  const [characters, setCharacters] = useState<Character[]>([]);
  const results = useMemo(() => data?.characters.results || [], [data]);
  const info = useMemo(() => data?.characters.info || ({} as Info), [data]);

  useEffect(() => {
    setCharacters((prev) => {
      return [...prev, ...results];
    });
  }, [results]);
  const getNext = useCallback(
    (page: number = 0) => {
      console.log("getting data");
      return fetchData({
        variables: {
          page,
        },
      });
    },
    [fetchData]
  );

  return {
    results,
    info,
    loading,
    characters,
    getNext,
  };
}
type TEST_QUERY_TYPE = { characters: Characters };
