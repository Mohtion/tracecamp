import React from 'react';
import logo from './logo.svg';
import './App.css';
var axios = require("axios");

function App() {

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
  return (
  console.log(pokemon_names)
  /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  */
  );
}

export default App;
