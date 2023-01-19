import { createContext, useContext, useState } from "react";

type SerchContextType = ReturnType<typeof useCreateSearchContext>;

export const useCreateSearchContext = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return { searchQuery, setSearchQuery };
};

export const SearchContext = createContext<SerchContextType>({} as any);

export const useSearchContext = () => {
  return useContext(SearchContext);
};
