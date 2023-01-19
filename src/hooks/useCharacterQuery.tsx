import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_CHARACTER_QUERY = gql`
  query GET_CHARACTER($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      gender
    }
  }
`;

export type CharacterDetail = {
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

type GET_CHARACTER_QUERY_TYPE = { character: CharacterDetail };

export function useCharacterQuery(id: number | string | undefined) {
  const { data, loading } = useQuery<GET_CHARACTER_QUERY_TYPE>(
    GET_CHARACTER_QUERY,
    { variables: { id }, skip: id == null }
  );

  return {
    data,
    loading,
  };
}
