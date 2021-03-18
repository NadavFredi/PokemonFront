import classes from './PokeInfo.module.css';
import React, { useEffect, useState } from 'react';
import PokeCard from '../PokeCard/PokeCard';
import { useSelector, useDispatch } from 'react-redux';


const PokeInfo = () => {
    useEffect(() => {
        console.log(card);
    }, [])
    let path = window.location.pathname.slice(1);
    const idIndex = path.indexOf("/");
    const id = path.slice(idIndex + 1);


    const cards = useSelector(state => state.generalReducer);
    const card = cards.filter(card => card.id == id)[0];

    return (
        <div >
            <PokeCard pokeId={card.id} pic={card.pic} name={card.name} types={card.types} moves={card.moves} evolveChain={card.evolveChain} games={card.games} evolveFrom={card.evolveFrom} detailed={true} />)
        </div>
    )
}

export default PokeInfo
