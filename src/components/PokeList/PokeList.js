import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PokeCard from '../PokeCard/PokeCard';
import classes from './PokeList.module.css';


const PokeList = ({ species }) => {
    const initPath = window.location.pathname.split('/').pop().toString();
    const [type, setType] = useState(initPath);


    let location = useLocation();
    useEffect(() => {
        setType(location.pathname.split('/').pop().toString());
    }, [location]);



    const cards = useSelector(state => state.generalReducer);
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
