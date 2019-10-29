import React from 'react';
import { Api } from './Api';

export function usePokemon(pokemonName) {
  const [pokemonDetails, setPokemonDetails] = React.useState({});

  React.useEffect(() => {
    let canceled = false;
    Api.getPokemon(pokemonName).then(pokemonData => {
      if (canceled) {
        return;
      }
      setPokemonDetails(prevPokemonDetails => {
        const nextPokemonDetails = {
          ...prevPokemonDetails,
          [pokemonName]: pokemonData,
        };
        return nextPokemonDetails;
      });
    });
    return () => {
      canceled = true;
    };
  }, [pokemonName]);

  return pokemonDetails[pokemonName] || null;
}
