var axios = require("axios");

let pokemon_names = [];
//get pokemon data in recursive function
//hopefully 'this' works
axios.get('https://pokeapi.co//api/v2/pokemon/')
    .then((pokemon) => {
        pokemon_names.push(pokemon.results.name)
        if (pokemon.next != null)
            return this(pokemon);
        else
            return;
    });

console.log(pokemon_names)