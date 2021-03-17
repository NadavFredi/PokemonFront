import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard'
import classes from './Favorites.module.css'
import { FaTrash } from "react-icons/fa";
import { addToFavorite, removeFromFavorite } from '../../redux/favorite/favoriteActions';
import { addData } from '../../redux/general/generalActions';


const Favorites = ({ pokeIds }) => {
    const cards2 = useSelector(state => state.favoriteReducer);
    const dispatch = useDispatch();

    const [cards, setCards] = useState([...pokeIds]);

    useEffect(() => {
        dispatch(addToFavorite({ id: 8, img: 2, name: 10 }));
        dispatch(addToFavorite({ id: 10, img: 2, name: 10 }));
        dispatch(addData({ img: 2, name: 10 }));
        dispatch(removeFromFavorite(10));

    }, [])
    const handleRemove = (item) => {

        console.log(item);
        setCards(cards.filter(id => {
            console.log(`id:${id} item: ${item} true? ${id !== item} `);
            return id !== item
        }));
        console.log(cards);
    }

    console.log("render");
    return (
        <div className={classes.favorites}>
            <div className={classes.grid} >
                {cards.map((id, index) => (
                    <div key={index} className={classes.cardContainer}>
                        <div className={classes.badgeContainer} onClick={() => handleRemove(id)}>
                            <FaTrash className={classes.badgeRight} />
                        </div>
                        <PokeCard pokeId={id} detailed={false} />
                    </div>
                ))}
            </div>
            <h1 > Those are all<br />my Favorite Pokemons! </h1>
        </div>
    )
}

export default Favorites
