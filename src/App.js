import React from 'react';
import { Api } from './Api';
import { Pokemon } from './Pokemon';

class App extends React.Component {
  state = {
    pokemons: null,
    pokemonsLoading: false,
    selectedPokemon: null,
  };

  async componentDidMount() {
    this.setState({ pokemonsLoading: true });
    const pokemons = await Api.getPokemons();
    this.setState({ pokemons, pokemonsLoading: false });
  }

  handlePokemonClick = async name => {
    this.setState({ selectedPokemon: name });
    // const pokemonData = await Api.getPokemon(name);
    // const nextPokemonDetails = {
    //   ...this.state.pokemonDetails,
    //   [name]: pokemonData,
    // };
    // this.setState({ pokemonDetails: nextPokemonDetails });
  };

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>Pokedex</h1>
        </header>
        <main>
          <div className="left-menu">
            {(() => {
              if (this.state.pokemonsLoading) {
                return <p>Loading...</p>;
              }
              if (this.state.pokemons === null) {
                return <p>No Data</p>;
              }
              return (
                <ul>
                  {this.state.pokemons.map(pokemon => {
                    return (
                      <li
                        key={pokemon.name}
                        onClick={async () => this.handlePokemonClick(pokemon.name)}
                        className={this.state.selectedPokemon === pokemon.name ? 'selected' : ''}
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
            {this.state.selectedPokemon === null ? (
              <p>Select a pokemon</p>
            ) : (
              <Pokemon key={this.state.selectedPokemon} name={this.state.selectedPokemon} />
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
