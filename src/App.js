import React from "react";
import { Api } from "./Api";

const App = () => {
  const [pokemons, setPokemons] = React.useState(null);
  const [pokemonsLoading, setPokemonsLoading] = React.useState(false);
  const [pokemonDetails, setPokemonDetails] = React.useState({});
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    setPokemonsLoading(true);
    Api.getPokemons().then(pokemons => {
      setPokemons(pokemons);
      setPokemonsLoading(false);
    });
  }, []);

  const handlePokemonClick = async name => {
    setSelectedPokemon(name);
    const pokemonData = await Api.getPokemon(name);
    const nextPokemonDetails = {
      ...pokemonDetails,
      [name]: pokemonData
    };
    setPokemonDetails(nextPokemonDetails);
  };

  const pokemonData = pokemonDetails[selectedPokemon] || null;

  return (
    <div className="wrapper">
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>
        <div className="left-menu">
          {(() => {
            if (pokemonsLoading) {
              return <p>Loading...</p>;
            }
            if (pokemons === null) {
              return <p>No Data</p>;
            }
            return (
              <ul>
                {pokemons.map(pokemon => {
                  return (
                    <li
                      key={pokemon.name}
                      onClick={() => handlePokemonClick(pokemon.name)}
                      className={
                        selectedPokemon === pokemon.name ? "selected" : ""
                      }
                    >
                      {pokemon.name}
                    </li>
                  );
                })}
              </ul>
            );
          })()}
        </div>
        <div className="content">
          {pokemonData === null ? (
            <p>?????</p>
          ) : (
            <React.Fragment>
              <h2>
                {pokemonData.name} ({pokemonData.count})
              </h2>
              <img src={pokemonData.sprites.front_default} alt="" />
            </React.Fragment>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
