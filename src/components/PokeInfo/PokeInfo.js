import classes from './PokeInfo.module.css';
import React from 'react'
import PokeCard from '../PokeCard/PokeCard';

const PokeInfo = () => {

    let path = window.location.pathname.slice(1);
    const idIndex = path.indexOf("/");
    const id = path.slice(idIndex + 1);

    // const id = urlParams.get('id');

    console.log(id);

    return (
        <div className={classes.flex}>
            <PokeCard pokeId={id} detailed={true} />
        </div>
    )
}

export default PokeInfo
