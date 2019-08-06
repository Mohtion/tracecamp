var axios = require("axios");

var pokemon_names = [];
//get pokemon data in recursive function
//hopefully 'this' works
axios.get('https://pokeapi.co/api/v2/pokemon/1')
    .then(function(response){
        console.log(response.data.name);
        pokemon_names[0] = response.name;
        //let next = response.next;
        /*
        while (next != "null"){
            axios.get(next)
                .then((response) => {
                    pokemon_names.push(response.results.items.name);
                    console.log(pokemon_names);
                });
        }
        */
    })
    .catch((error) =>{
        console.log("(An error has occurred.)");
    });


console.log(pokemon_names);