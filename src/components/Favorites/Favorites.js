import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from '../../redux/general/generalActions';
import PokeCard from '../PokeCard/PokeCard';
import classes from './Favorites.module.css';


const Favorites = ({ pokeIds }) => {
    const cards = useSelector(state => state.generalReducer);
    const dispatch = useDispatch();
    const [favs, setFavs] = useState([]);


    useEffect(() => {
        const data = localStorage.getItem('favorites');
        if (data) setFavs(JSON.parse(data));

    }, [])

    useEffect(() => {
        setFavs(cards.filter(data => data.favorite === true));
        localStorage.setItem('favorites', JSON.stringify(favs));
    });

    return (
        <div className={classes.favorites}>
            <div className="Container">
                <div className={classes.grid} >
                    {favs.map((data, index) => (
                        <div key={index} className={classes.cardContainer}>
                            <div className={classes.badgeContainer} onClick={() => dispatch(removeFromFavorite(data))}>
                                <FaTrash className={classes.badgeRight} />
                            </div>
                            <PokeCard pokeId={data.pokeId} key={index} pic={data.pic} name={data.name} types={data.types} moves={data.moves} evolveChain={data.evolveChain} games={data.games} evolveFrom={data.evolveFrom} favorite={data.favorite} detailed={false} />
                        </div>
                    ))}
                </div>
            </div>

            <h1 > Those are all<br />my Favorite Pokemons! </h1>
        </div>
    )
}

export default Favorites
