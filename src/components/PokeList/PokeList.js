import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';
import classes from './PokeList.module.css';


const PokeList = ({ species }) => {
    const path = window.location.pathname.split('/').pop().toString();
    const [type, setType] = useState(path);

    const dispatch = useDispatch();
    const cards = useSelector(state => state.generalReducer);
    // const [cards, setCards] = useState(cardSelector);

    // useEffect(() => {
    //     setCards(cardSelector);

    // }, [cardSelector, dispatch]);

    // console.log(cards.filter(card => card.types.includes(type)));
    // console.log(cards.filter(card => card.types.includes('fire')));



    const filtered = (
        <div className={classes.grid} >
            {cards.filter(card => card.types.includes(type)).map((data, index) => <PokeCard id={data.id} key={index} pic={data.pic} name={data.name} types={data.types} moves={data.moves} evolveChain={data.evolveChain} games={data.games} evolveFrom={data.evolveFrom} favorite={data.favorite} detailed={false} />)}


        </div>
    )


    const withoutFilter = (
        <div className={classes.grid} >
            {cards.map((data, index) => <PokeCard id={data.id} key={index} pic={data.pic} name={data.name} types={data.types} moves={data.moves} evolveChain={data.evolveChain} games={data.games} evolveFrom={data.evolveFrom} favorite={data.favorite} detailed={false} />)}
        </div>
    );

    return (
        <div className="Container" >
            {species === "all" ? withoutFilter : filtered}
        </div>
    )
}

export default PokeList
