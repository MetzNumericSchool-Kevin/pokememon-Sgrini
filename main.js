const grille = document.querySelectorAll("#grille_de_jeu > div > img");

let pokemon = [];

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
    return pokemon.push(...await getPokemon());
}
await loadPokemon();
console.log(pokemon);

async function shuffle() {
    await getPokemon(); 
    for (let i = 0; i < pokemon.length; i++) {
        pokemon[i]["used"] = false;
    }
}

addEventListener("click", async () => {
    await shuffle();
    // console.log(pokemon);

    const limit = Math.min(grille.length, pokemon.length);

    for (let i = 0; i < limit; i++) {
        if (pokemon[i] && pokemon[i].sprite) {
            grille[i].src = pokemon[i].sprite;
        } else {
            grille[i].src = "./assets/bush.webp";
        }
    }

    for (let i = limit; i < grille.length; i++) {
        grille[i].src = "./assets/bush.webp"; 
    }
});
// if (pokemon(cellPosition).affectedPokemon == null) {
//     const rdmPkmnArray = Math.floor(Math.random() * pokemonArray.length);
//     console.log("Nouveau pokemon" + pokemonArray[rdmPkmnArray]["name"]);
