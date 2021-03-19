import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';


const PokeInfo = () => {

    let path = window.location.pathname.slice(1);
    const idIndex = path.indexOf("/");
    const id = path.slice(idIndex + 1);



    const cards = useSelector(state => state.generalReducer);
    const card = cards.filter(c => c.id == id)[0];


    return (
        <div className="Container">
            <PokeCard pokeId={card.id} pic={card.pic} name={card.name} types={card.types} moves={card.moves} evolveChain={card.evolveChain} games={card.games} evolveFrom={card.evolveFrom} detailed={true} />)
        </div>
    )
}

export default PokeInfo
