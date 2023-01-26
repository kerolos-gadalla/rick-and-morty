import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterCharacters = { name?: string };

type CharactersState = {
  filter: FilterCharacters;
};

const initialCharacters: CharactersState = { filter: {} };

const charactersSlice = createSlice({
  name: "characters",
  initialState: initialCharacters,
  reducers: {
    clearFilter: (state, _action) => {
      state.filter = {};
    },
    setFilterValue: (
      state,
      action: PayloadAction<{
        key: keyof CharactersState["filter"];
        value: string;
      }>
    ) => {
      state.filter = { ...state.filter };
      state.filter[action.payload.key] = action.payload.value;
    },
  },
});

export const rootReducer = combineReducers({
  characters: charactersSlice.reducer,
});

export const rootActions = {
  characters: charactersSlice.actions,
};

export type RootState = ReturnType<typeof rootReducer>;
