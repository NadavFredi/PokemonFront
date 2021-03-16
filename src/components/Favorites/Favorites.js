import React from 'react'
import PokeCard from '../PokeCard/PokeCard'
import classes from './Favorites.module.css'

const Favorites = ({ pokeIds }) => {
    return (
        <div className={classes.favorites}>
            <div className={classes.grid} >
                {pokeIds.map(id => <PokeCard pokeId={id} detailed={false} />)}
            </div>
            <h1 > Those are all<br />my Favorite Pokemons! </h1>
        </div>
    )
}

export default Favorites
