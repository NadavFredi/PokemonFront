import React, { useEffect, useState } from 'react'
import classes from './PokeList.module.css';
import axios from 'axios';
import PokeCard from '../PokeCard/PokeCard';

const PokeList = ({ amount }) => {

    const [pokedex, setPokedex] = useState([]);


    useEffect(() => {
        const fetch = async () => {
            try {
                let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${amount}`);

                data = data.results;
                setPokedex(data.map(el => el));
                console.log(data);

            } catch (error) {
                console.log(error)
            }
        }
        fetch();

    }, [])

    return (
        <div className="Container" >
            <div className={classes.grid} >
                {pokedex.map((data, index) => <PokeCard pokeId={index + 1} />)}
            </div>
        </div>
    )
}

export default PokeList
