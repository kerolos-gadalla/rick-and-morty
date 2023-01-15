import React, { useCallback, useEffect, useState } from "react";
import { useCharactersQuery } from "./useCharactersQuery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Container, Paper, styled } from "@mui/material";

export function CharactersPage({}) {
  const { characters, info, getNext } = useCharactersQuery();

  const [hasMore, setHasMore] = useState(true);
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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    lineHeight: "60px",
  }));

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
            <Item key={character.id} elevation={3}>
              id: {character.id}
              <br />
              name: {character.name}
              <br />
            </Item>

            // <Paper square elevation={3} key={character.id}>
            //   id: {character.id}
            //   <br />
            //   name: {character.name}
            //   <br />
            // </Paper>
          ))}
        </Box>
      </InfiniteScroll>
    </Container>
  );
}
