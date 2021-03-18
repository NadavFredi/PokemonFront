import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from '../../redux/favorite/favoriteActions';
import PokeCard from '../PokeCard/PokeCard';
import classes from './Favorites.module.css';


const Favorites = ({ pokeIds }) => {
    const cards2 = useSelector(state => state.favoriteReducer);
    const dispatch = useDispatch();

    return (
        <div className={classes.favorites}>
            <div className={classes.grid} >
                {cards2.map((data, index) => (
                    <div key={index} className={classes.cardContainer}>
                        <div className={classes.badgeContainer} onClick={() => dispatch(removeFromFavorite(data.pokeId))}>
                            <FaTrash className={classes.badgeRight} />
                        </div>
                        <PokeCard pokeId={data.pokeId} key={index} pic={data.pic} name={data.name} types={data.types} moves={data.moves} evolveChain={data.evolveChain} games={data.games} evolveFrom detailed={false} />
                    </div>
                ))}
            </div>
            <h1 > Those are all<br />my Favorite Pokemons! </h1>
        </div>
    )
}

export default Favorites
