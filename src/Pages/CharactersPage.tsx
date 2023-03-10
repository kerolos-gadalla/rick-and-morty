import React, { useCallback, useEffect, useState } from "react";
import { useCharactersQuery } from "../hooks/useCharactersQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import { CharacterCard } from "../components/CharacterCard";
import { useSearchContext } from "../providers/useCreateSearchContext";

export function CharactersPage({}) {
  const { characters, info, getNext } = useCharactersQuery();

  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setHasMore((_hasMore) => {
      return info?.next > 1;
    });
  }, [setHasMore, info]);

  const getMore = useCallback(() => {
    getNext(info?.next);
  }, [getNext, info?.next]);
  
  useEffect(() => {
    getNext(1);
  }, [getNext]);

  return (
    <>
      {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
      <InfiniteScroll
        next={getMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        dataLength={info.count || 0}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </Box>
      </InfiniteScroll>
    </>
  );
}
