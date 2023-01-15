import React, { useCallback, useEffect, useState } from "react";
import { useCharactersQuery } from "./useCharactersQuery";
import InfiniteScroll from "react-infinite-scroll-component";

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

  return (
    <div className="App">
      <pre>{JSON.stringify(info, null, 2)}</pre>
      <InfiniteScroll
        next={getMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        dataLength={info.count || 0}
      >
        {characters.map((character) => (
          <div key={character.id}>
            id: {character.id}
            <br />
            name: {character.name}
            <br />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
