import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { useCharactersQuery } from "./useCharactersQuery";
import { graphQLClient } from "./graphQLClient";
import InfiniteScroll from "react-infinite-scroll-component";

function AppComponent() {
  const page = 2;
  const { characters, info, getNext } = useCharactersQuery();

  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setHasMore((hasMore) => {
      return info?.next > 0;
    });
  }, [setHasMore, info]);

  const getMore = useCallback(() => {
    getNext(info?.next);
  }, [getNext, info?.next]);
  useEffect(() => {
    getNext(0);
  }, [getNext]);
  // const results = data?.characters.results;
  return characters == null ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ) : (
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

const App = () => (
  <ApolloProvider client={graphQLClient}>
    <AppComponent />
  </ApolloProvider>
);

export default App;
