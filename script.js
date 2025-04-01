const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 649;
const pokeColors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const mainTypes = Object.keys(pokeColors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokeCard");

    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    if (name.includes("-")) {
        name = name.split("-")[0];
    }

    const id = pokemon.id.toString().padStart(3, "0");
    const pokeTypes = pokemon.types.map((type) => type.type.name);
    const type = mainTypes.find((type) => pokeTypes.includes(type)) || "normal";
    pokemonCard.style.backgroundColor = pokeColors[type];

    pokemonCard.innerHTML = `
        <div class="pokeImgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${name}">
        </div>
        <div class="pokeDataContainer">
            <span class="pokeId">#${id}</span>
            <h3 class="pokeName">${name}</h3>
            <small class="pokeType">Type: ${type}</small>
        </div>
    `;
    pokeContainer.appendChild(pokemonCard);
}


fetchPokemons();
