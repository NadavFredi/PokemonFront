import { FETCH_ALL, FETCH_FAILED, FETCH_SUCCEED, FETCH_SINGLE } from './requestActionTypes';
import { addData } from '../general/generalActions';
import axios from 'axios';

const POKEMON_NUMBER = 151;

export const fetchAll = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_ALL });
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_NUMBER}`);
        dispatch({
            type: FETCH_SUCCEED,
            payload: res.data.results
        })

    } catch (error) {
        dispatch({ type: FETCH_FAILED })
        console.log(error)
    }

}


export const fetchSingle = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_SINGLE });
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
        dispatch({ type: FETCH_FAILED })
        console.log(error)
    }

}


