import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, Switch
} from "react-router-dom";
import { Ouroboro } from 'react-spinners-css';
import './App.css';
import Favorites from './components/Favorites/Favorites';
import Navbar from './components/Navbar/Navbar';
import PokeInfo from './components/PokeInfo/PokeInfo';
import PokeList from './components/PokeList/PokeList';
import { addData } from './redux/general/generalActions';


const App = () => {
  const POKEMON_NUMBER = 151;
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {

    const addToStore = async (id) => {
      try {

        const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`);
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
        const obj = { id: id, pic: pic, name: name, types: types, moves: moves, evolveChain: evolveChain, games: games, evolveFrom: evolveFrom, favorite: false };
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
          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/pokemon/type/:species">
            <PokeList />
          </Route>
          <Route path="/pokemon/:id">
            <PokeInfo />
          </Route>

          <Route path="/">
            <PokeList species="all" />
          </Route>
        </Switch>}

    </div>
  );
}

export default App;
