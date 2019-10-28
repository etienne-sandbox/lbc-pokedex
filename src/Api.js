import ky from 'ky';

const fetcher = ky.extend({
  prefixUrl: 'https://pokeapi.co/api/v2',
});

function wait(time) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve();
    }, time);
  });
}

function waitRandom(min, max) {
  const time = min + Math.floor(Math.random() * (max - min));
  return wait(time);
}

let counter = 0;

export const Api = {
  getPokemons: async () => {
    await waitRandom(500, 2000);
    const res = await fetcher.get('pokemon');
    return (await res.json()).results;
  },
  getPokemon: async id => {
    const count = counter++;
    await waitRandom(500, 2000);
    const res = fetcher.get(`pokemon/${id}`);
    const data = await res.json();
    data.count = count;
    return data;
  },
};
