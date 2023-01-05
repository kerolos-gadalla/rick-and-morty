import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.graphcdn.app/",
  cache: new InMemoryCache(),
});

const TEST_QUERY = gql`
  query Get_Characters($page: Int) {
    characters(page: $page) {
      info {
        count
        next
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
};

type Characters = {
  info: Info;
  results: [Character];
};

type TEST_QUERY_TYPE = { characters: Characters };
function App() {
  const { data } = useQuery<TEST_QUERY_TYPE>(TEST_QUERY, {
    variables: {
      page: 2
    }
  });

  const results = data?.characters.results;
  return results == null ? (
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
      {results.map((character) => (
        <div key={character.id}>
          id: {character.id}
          <br />
          name: {character.name}
          <br />
        </div>
      ))}
    </div>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
