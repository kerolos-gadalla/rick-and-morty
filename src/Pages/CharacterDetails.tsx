import React from "react";
import { Character } from "../hooks/useCharactersQuery";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Link,
  Paper,
  styled,
  Container,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { getCharacterLink } from "../routes/routeHelpers";
import { useParams } from "react-router-dom";
import { CharacterDetail, useCharacterQuery } from "../hooks/useCharacterQuery";

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

export function CharacterDetails(): JSX.Element {
  const { id } = useParams();
  // const character = { name: id } as any;
  const { data, loading } = useCharacterQuery(id);
  const character = data?.character || ({} as CharacterDetail);
  return (
    <Container maxWidth="sm">
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
          image={character.image}
          alt={`image of ${character.name}`}
        />
        <Chip label={character.species} />
        <Chip label={character.gender} variant="outlined" />
      </Item>
    </Container>
  );
}
