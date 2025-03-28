const grille = document.querySelectorAll("#grille_de_jeu .box");

const pokemonList = [];
const randomPokemonPairs = [];
let firstPick = null;
let secondPick = null;
let canClick = true;

const getRandomInt = (max) => Math.floor(Math.random() * max);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getPokemon() {
  const url = "http://localhost:5501/data/pokemon.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur de chargement: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function loadPokemon() {
  const pokemons = await getPokemon();
  if (pokemons.length > 0) {
    pokemonList.push(...pokemons);
  }
}

async function start() {
  await loadPokemon();

  for (let i = 0; i < 6; i++) {
    const randomInt = getRandomInt(pokemonList.length);
    const pokemon = pokemonList.splice(randomInt, 1);
    randomPokemonPairs.push(...pokemon, ...pokemon);
  }

  shuffleArray(randomPokemonPairs);

  grille.forEach((cell, index) => {
    cell.innerHTML = "<img src='./assets/bush.webp' class='bush' />";
    cell.addEventListener("click", () => handleClick(cell, index));
  });
}

function handleClick(cell, index) {
  if (!canClick || cell.classList.contains("revealed")) return;

  let bushimg = cell.querySelector(".bush");
  if (bushimg) {
    bushimg.style.opacity = "0";
  }

  const pokemon = document.createElement("img");
  pokemon.src = randomPokemonPairs[index].sprite;
  pokemon.classList.add("pokemon");
  cell.appendChild(pokemon);
  cell.classList.add("revealed");

  if (!firstPick) {
    firstPick = { cell, index };
  } else {
    secondPick = { cell, index };
    canClick = false;

    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  if (firstPick && secondPick) {
    if (
      randomPokemonPairs[firstPick.index].name ===
      randomPokemonPairs[secondPick.index].name
    ) {
      console.log("Bonne paire !");
    } else {
      firstPick.cell.innerHTML =
        "<img src='./assets/bush.webp' class='bush' />";
      secondPick.cell.innerHTML =
        "<img src='./assets/bush.webp' class='bush' />";
      firstPick.cell.classList.remove("revealed");
      secondPick.cell.classList.remove("revealed");
    }

    firstPick = null;
    secondPick = null;
    canClick = true;
  }
}

start();
