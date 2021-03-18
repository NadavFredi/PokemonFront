import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addData } from './redux/general/generalActions';
import { Ouroboro } from 'react-spinners-css';

import Navbar from './components/Navbar/Navbar';
import PokeList from './components/PokeList/PokeList';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import Favorites from './components/Favorites/Favorites';
import PokeInfo from './components/PokeInfo/PokeInfo';

const App = () => {
  const POKEMON_NUMBER = 151;
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {

    const addToStore = async (pokeId) => {
      try {

        const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const pic = data.sprites.other.dream_world.front_default;
        const name = data.name;
        const types = data.types.map(type => type.type.name);
        const moves = data.moves.map(el => el.move.name);
        const games = data.game_indices.map(el => el.version.name);
        const speciesUrl = data.species.url;

        const evolveData = await axios.get(speciesUrl);
        let evolutionUrl = evolveData.data.evolution_chain.url;
        let evolveFrom = ["didn't evolve"]
        if (evolveData.data.evolves_from_species) {
          evolveFrom = evolveData.data.evolves_from_species.name;
        }

        const res = await axios.get(evolutionUrl);


        //theres only 2 at max evolves
        const evolveArr = [];
        let evolveFlag = false;
        let firstEvolve = "firstev";
        if (firstEvolve && res.data.chain.evolves_to) {
          firstEvolve = res.data.chain.evolves_to[0];
        }
        if (firstEvolve && firstEvolve.species.name !== data.name) {
          evolveArr.push(firstEvolve.species.name);
          evolveFlag = true;
        }

        let secondEvolve = "secondev";
        if (res.data.chain && res.data.chain.evolves_to[0])
          secondEvolve = res.data.chain.evolves_to[0].evolves_to[0];
        if (secondEvolve && secondEvolve.species && secondEvolve.species.name !== data.name) {
          evolveArr.push(secondEvolve.species.name);
          evolveFlag = true;


        }

        let evolveChain = ["can't evolve"];
        if (evolveFlag) evolveChain = evolveArr.map(ev => ev);
        const obj = { id: pokeId, pic: pic, name: name, types: types, moves: moves, evolveChain: evolveChain, games: games, evolveFrom: evolveFrom };
        dispatch(addData(obj));

      } catch (error) {
        console.log(error);
        setLoading(false);

      }

    }


    for (let i = 1; i <= POKEMON_NUMBER; i++) {
      addToStore(i);
    }

    setLoading(false);

  }, []);



  return (
    <div className="App">
      <Navbar />

      {loading ? <Ouroboro /> :

        <Switch>
          <Route exact path="/">
            <PokeList amount={POKEMON_NUMBER} />
          </Route>

          <Route path="/favorites">
            <Favorites pokeIds={[1, 2, 3, 80, 5, 6]} />
          </Route>

          <Route path="/pokemon/:id">
            <PokeInfo />
          </Route>
        </Switch>}

    </div>
  );
}

export default App;
