const grille = document.querySelectorAll("#grille_de_jeu > div ");

const pokemonList = [];
const randomPokemonPairs = [];

const getRandomInt = (max) => Math.floor(Math.random() * max);

function randomPokemon(array) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

async function getPokemon() {
    const url = "http://localhost:5500/data/pokemon.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function loadPokemon() {
    return pokemonList.push(...await getPokemon());
}
await loadPokemon();

for (let i=0; i < 6; i++) {
    const randomInt = getRandomInt(pokemonList.length);
    const pokemon = pokemonList.splice(randomInt, 1);

    randomPokemonPairs.push(...pokemon,...pokemon);
}
console.log(randomPokemonPairs);

randomPokemon(randomPokemonPairs);
console.log(randomPokemonPairs);

grille.forEach((cell)=> {
    cell.innerHTML = "<img src='./assets/bush.webp' class='bush' />"; 
    cell.addEventListener("click", () => {
        const posCell = Array.from(grille).indexOf(cell);
        let bushimg = cell.querySelector(".bush");
        bushimg.style.opacity = "0";
        console.log(bushimg);

        const pokemon = document.createElement("img");
        pokemon.src = randomPokemonPairs[posCell].sprite;
        pokemon.classList.add("pokemon");
        cell.appendChild(pokemon);
    });
});

// async function shuffle() {
//     await getPokemon(); 
//     for (let i = 0; i < pokemon.length; i++) {
//         pokemon[i]["used"] = false;
//     }
// }

// addEventListener("click", async () => {
//     await shuffle();

//     const limit = Math.min(grille.length, pokemon.length);

//     for (let i = 0; i < limit; i++) {
//         if (pokemon[i] && pokemon[i].sprite) {
//             grille[i].src = pokemon[i].sprite;
//         } else {
//             grille[i].src = "./assets/bush.webp";
//         }
//     }

//     for (let i = limit; i < grille.length; i++) {
//         grille[i].src = "./assets/bush.webp"; 
//     }
// });
