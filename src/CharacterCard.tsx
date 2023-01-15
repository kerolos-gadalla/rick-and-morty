import React from "react";
import { Character } from "./hooks/useCharactersQuery";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Link,
  Paper,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { getCharacterLink } from "./routes/routeHelpers";

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

export function CharacterCard({
  character,
}: {
  character: Character;
}): JSX.Element {
  return (
    <Link key={character.id} href={getCharacterLink(character.id)}>
      <Item key={character.id} elevation={3}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="character"
              src={character.image}
            ></Avatar>
          }
          title={character.name}
        />
        <CardMedia
          component="img"
          height="194"
          image={character.image}
          alt="Paella dish"
        />
        <Chip label={character.species} />
        <Chip label={character.gender} variant="outlined" />
      </Item>
    </Link>
  );
}
