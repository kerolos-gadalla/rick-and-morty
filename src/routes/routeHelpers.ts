import { app_prefix } from "../consts/env";

export const getRoute = (route: string) => `/${app_prefix}${route}`;

export const getCharacterLink = (id?: string | number | undefined) => {
  const name = "characters";
  if (id == null) {
    return getRoute(`/${name}/`);
  }
  return getRoute(`/${name}/${id}/`);
};

export const getDimensionsLink = (id?: string | number | undefined) => {
  const name = "dimensions";
  if (id == null) {
    return getRoute(`/${name}/`);
  }
  return getRoute(`/${name}/${id}/`);
};
