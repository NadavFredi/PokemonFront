import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';
import { useLocation } from 'react-router-dom'



const PokeInfo = () => {

    const initId = window.location.pathname.split('/').pop();
    const [id, setId] = useState(initId);


    let location = useLocation();
    useEffect(() => {
        setId(location.pathname.split('/').pop());
    }, [location]);


    const cards = useSelector(state => state.generalReducer);

    const card = cards.filter(c => { console.log(`c.id: ${c.id} id: ${id} ${id === c.id}`); return c.id == id })[0];
    // console.log(card);


    return (
        <div className="Container">
            <PokeCard id={card.id} pic={card.pic} name={card.name} types={card.types} moves={card.moves} evolveChain={card.evolveChain} games={card.games} evolveFrom={card.evolveFrom} detailed={true} />)
        </div>
    )
}

export default PokeInfo
