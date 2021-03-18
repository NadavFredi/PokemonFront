import React from 'react';
import { useSelector } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';
import classes from './PokeList.module.css';


const PokeList = () => {

    const cards = useSelector(state => state.generalReducer);
    console.log("render");
    return (
        <div className="Container" >
            <div className={classes.grid} >
                {cards.map((data, index) => <PokeCard pokeId={data.id} key={index} pic={data.pic} name={data.name} types={data.types} moves={data.moves} evolveChain={data.evolveChain} games={data.games} evolveFrom={data.evolveFrom} favorite={data.favorite} detailed={false} />)}
            </div>
        </div>
    )
}

export default PokeList
