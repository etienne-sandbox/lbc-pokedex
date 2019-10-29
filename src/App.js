import React from 'react';
import { Api } from './Api';
import { usePokemon } from './usePokemon';

const App = () => {
  const [pokemons, setPokemons] = React.useState(null);
  const [pokemonsLoading, setPokemonsLoading] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState('ivysaur');
  const pokemonData = usePokemon(selectedPokemon);
  const bulbasaurData = usePokemon('bulbasaur');

  React.useEffect(() => {
    setPokemonsLoading(true);
    let canceled = false;
    Api.getPokemons().then(pokemons => {
      if (canceled === false) {
        setPokemons(pokemons);
        setPokemonsLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, []);

  const handlePokemonClick = async name => {
    setSelectedPokemon(name);
  };

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
                      onClick={async () => handlePokemonClick(pokemon.name)}
                      className={selectedPokemon === pokemon.name ? 'selected' : ''}
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
          <div>{bulbasaurData && <img src={bulbasaurData.sprites.front_default} alt="" />}</div>
        </div>
      </main>
    </div>
  );
};

export default App;
