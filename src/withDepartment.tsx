import React, { createContext, useContext, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { getCharacterLink, getDimensionsLink } from "./routes/routeHelpers";

export type DepartmentType = "characters" | "dimensions" | undefined;

const useGetDepartment = () => {
  const charactersLink = getCharacterLink();
  const dimensionsLink = getDimensionsLink();
  const [value, setValue] = useState<DepartmentType>("characters");
  const isCharacters = useMatch(charactersLink);
  const isDimensions = useMatch(dimensionsLink);

  useEffect(() => {
    if (isCharacters) {
      setValue("characters");
    } else if (isDimensions) {
      setValue("dimensions");
    } else {
      setValue(undefined);
    }
  }, [isCharacters, isDimensions]);
  return value;
};

const DepartmentContext = createContext<DepartmentType>("characters");

export function withDepartment<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => {
    const value = useGetDepartment();

    return (
      <DepartmentContext.Provider value={value}>
        <Component {...props} />
      </DepartmentContext.Provider>
    );
  };
}

export const useDepartmentContext = () => useContext(DepartmentContext);
