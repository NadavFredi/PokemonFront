import React, { useEffect, useState } from 'react';
import classes from './PokeCard.module.css';
const axios = require('axios');

const PokeCard = ({ pokeId }) => {


    const [pic, setPic] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [weaks, setWeaks] = useState("");
    const [moves, setMoves] = useState([]);
    const [evolveChain, setEvolveChain] = useState([]);
    const [games, setGames] = useState([]);
    const [speciesUrl, setSpeciesUrl] = useState("");
    const [evolutionUrl, setEvolutionUrl] = useState("");
    const [evolveFrom, setEvolveFrom] = useState("");


    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}`);
                setPic(data.sprites.other.dream_world.front_default);
                setName(data.name);
                setType(data.types[0].type.name);
                setMoves(data.moves.map(el => el.move.name));
                setGames(data.game_indices.map(el => el.version.name));
                setSpeciesUrl(data.species.url);

                const evolveData = await axios.get(data.species.url);
                setEvolutionUrl(evolveData.data.evolution_chain.url);
                if (evolveData.data.evolves_from_species) {
                    setEvolveFrom(evolveData.data.evolves_from_species.name);
                }

                const res = await axios.get(evolveData.data.evolution_chain.url);


                //theres only 2 at max evolves
                const evolveArr = [];
                const firstEvolve = res.data.chain.evolves_to[0];
                if (firstEvolve && firstEvolve.species.name !== data.name) {
                    evolveArr.push(firstEvolve.species.name);
                }

                const secondEvolve = res.data.chain.evolves_to[0].evolves_to[0];
                if (secondEvolve && secondEvolve.species.name !== data.name) {
                    evolveArr.push(secondEvolve.species.name);
                }

                setEvolveChain(evolveArr.map(ev => ev));


                console.log(evolveArr);



            } catch (error) {
                console.log(error);
            }
        }
        fetch();

    }, []);


    return (
        <div className={classes.pokeCard}>
            <img src={pic} className={classes.avatar} alt="pic" />
            <div>name: {name}</div>
            <div>type: {type}</div>
            <div>name: {name}</div>
            <div>evolves from: {evolveFrom}</div>
            <div>evolve chain: {evolveChain.map((name, index) => (
                <div key={index}>{name}</div>
            ))}</div>
        </div>
    )
}

export default PokeCard
