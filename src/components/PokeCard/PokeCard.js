import React, { useEffect, useState } from 'react';
import classes from './PokeCard.module.css';
import axios from 'axios';
import Backdrop from '../Backdrop/Backdrop';
// import Spinner from '../Spinner/Spinner';
import { Ouroboro } from 'react-spinners-css';
import { Link } from 'react-router-dom';

const PokeCard = ({ pokeId, detailed }) => {


    const [pic, setPic] = useState("");
    const [name, setName] = useState("");
    const [types, setTypes] = useState([]);
    const [weaks, setWeaks] = useState("");
    const [moves, setMoves] = useState([]);
    const [evolveChain, setEvolveChain] = useState([]);
    const [games, setGames] = useState([]);
    const [speciesUrl, setSpeciesUrl] = useState("");
    const [evolutionUrl, setEvolutionUrl] = useState("");
    const [evolveFrom, setEvolveFrom] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}`);
                setPic(data.sprites.other.dream_world.front_default);
                setName(data.name);
                setTypes(data.types.map(type => type.type.name));
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
                let firstEvolve;
                if (res.data.chain.evolves_to) {
                    firstEvolve = res.data.chain.evolves_to[0];
                }
                if (firstEvolve && firstEvolve.species.name !== data.name) {
                    evolveArr.push(firstEvolve.species.name);
                }

                const secondEvolve = res.data.chain.evolves_to[0].evolves_to[0];
                if (secondEvolve && secondEvolve.species.name !== data.name) {
                    evolveArr.push(secondEvolve.species.name);
                }
                setEvolveChain(evolveArr.map(ev => ev));

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);

            }
        }
        fetch();

    }, []);

    const matchClassTo = (btnStyle, type) => {
        if (type === "grass") btnStyle.push(classes.grass);
        if (type === "fire") btnStyle.push(classes.fire);
        if (type === "water") btnStyle.push(classes.water);
        if (type === "bug") btnStyle.push(classes.bug);
        if (type === "poison") btnStyle.push(classes.poison);
        if (type === "electric") btnStyle.push(classes.electric);
        if (type === "fairy") btnStyle.push(classes.fairy);
        if (type === "normal") btnStyle.push(classes.normal);
        if (type === "fly") btnStyle.push(classes.fly);
        btnStyle.push(classes.fly);
        if (type === "ground") btnStyle.push(classes.ground);
        if (type === "fighting") btnStyle.push(classes.fighting);
        if (type === "psychic") btnStyle.push(classes.psychic);
        if (type === "ghost") btnStyle.push(classes.ghost);
        if (type === "rock") btnStyle.push(classes.rock);
        if (type === "ice") btnStyle.push(classes.ice);
        if (type === "dragon") btnStyle.push(classes.dragon);
        return btnStyle.join(' ');

    }

    const normalContent = (
        <div>
            <img src={pic} className={classes.avatar} alt="picture" />
            <div className={classes.flex}>
                <div className={classes.id}>#{pokeId}</div>
                <div className={classes.name}>{name}</div>
                <div className={classes.types}>
                    {types.map(type => {
                        const btnStyle = [classes.type];
                        return (
                            <div className={matchClassTo(btnStyle, type)} >{type}</div>
                        )
                    })}
                </div>

            </div>
        </div>

    );

    // const detailed = true;

    let content;
    const detailedcontent = (
        <div>
            <img src={pic} className={classes.avatar} alt="picture" />
            <div className={classes.flexDetailed}>
                <div className={classes.idDetailed}>#{pokeId}</div>
                <div className={classes.nameDetailed}>{name}</div>
                <div className={classes.typesDetailed}>
                    {types.map(type => {
                        const btnStyle = [classes.typeDetailed];
                        return (
                            <div className={matchClassTo(btnStyle, type)} >{type}</div>
                        )
                    })}
                </div>
            </div>

            {evolveFrom &&
                (<div className={classes.evolved}>
                    evolved from:
                </div>)}

        </div>
    );
    if (detailed) {
        content = detailedcontent;
    }
    else {
        content = normalContent;
    }


    return (

        <Link to={`/pokemon/${pokeId}`} className={classes.pokeCard}  >
            {loading ? <Ouroboro /> : content}
        </Link>
    )
}

export default PokeCard
