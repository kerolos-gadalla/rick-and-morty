import { createContext, useContext, useState } from "react";

type SerchContextType = {
  searchQuery: string | undefined;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>> | undefined;
};

// const useCreateSearchContext = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   return { searchQuery, setSearchQuery };
// };

export const SearchContext = createContext<SerchContextType>({} as any);

export const useSearchContext = () => {
  return useContext(SearchContext);
};
