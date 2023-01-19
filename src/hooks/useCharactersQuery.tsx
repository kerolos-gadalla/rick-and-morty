import { gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchContext } from "../providers/useCreateSearchContext";

const TEST_QUERY = gql`
  query Get_Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        next
        prev
        pages
      }
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;

export type FilterCharacter = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
};

export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  type: string;
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

  const { searchQuery } = useSearchContext();

  useEffect(() => {
    setCharacters((_prev) => {
      return [];
    });
  }, [searchQuery]);

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
          filter: {
            name: searchQuery,
          },
        },
      });
    },
    [fetchData, searchQuery]
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
