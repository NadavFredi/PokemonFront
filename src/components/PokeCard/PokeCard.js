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

            } catch (error) {
                console.log(error);
            }
        }
        fetch();

    }, []);

    console.log(evolutionUrl);
    console.log(speciesUrl);

    return (
        <div className={classes.pokeCard}>
            <img src={pic} className={classes.avatar} alt="pic" />
            <div>name: {name}</div>
            <div>type: {type}</div>
            <div>name: {name}</div>
        </div>
    )
}

export default PokeCard
