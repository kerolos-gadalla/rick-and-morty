import React, { useCallback, useEffect, useState } from "react";
import { useCharactersQuery } from "./hooks/useCharactersQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Container } from "@mui/material";
import { CharacterCard } from "./CharacterCard";

export function CharactersPage({}) {
  const { characters, info, getNext } = useCharactersQuery();

  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setHasMore((hasMore) => {
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
    <Container maxWidth="sm">
      <pre>{JSON.stringify(info, null, 2)}</pre>
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
            <CharacterCard character={character} />
          ))}
        </Box>
      </InfiniteScroll>
    </Container>
  );
}
