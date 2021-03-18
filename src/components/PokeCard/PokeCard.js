import React, { useState, useEffect } from 'react';
import { BsStar } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavorite } from '../../redux/favorite/favoriteActions';
import classes from './PokeCard.module.css';



const PokeCard = ({ pokeId, detailed, id, pic, name, types, moves, evolveChain, games, evolveFrom }) => {

    const FAVORITE_NUMBER = 6;

    const obj = { pokeId, detailed, id, pic, name, types, moves, evolveChain, games, evolveFrom };
    const dispatch = useDispatch();
    const [isTwice, setIsTwice] = useState();

    useEffect(() => {
        setIsTwice(isInFavorite(obj));
    }, []);


    const matchClassTo = (btnStyle, type) => {
        if (type === "grass") btnStyle.push(classes.grass);
        if (type === "fire") btnStyle.push(classes.fire);
        if (type === "water") btnStyle.push(classes.water);
        if (type === "bug") btnStyle.push(classes.bug);
        if (type === "poison") btnStyle.push(classes.poison);
        if (type === "electric") btnStyle.push(classes.electric);
        if (type === "fairy") btnStyle.push(classes.fairy);
        if (type === "normal") btnStyle.push(classes.normal);
        if (type === "fly") btnStyle.push(classes.fly);
        btnStyle.push(classes.fly);
        if (type === "ground") btnStyle.push(classes.ground);
        if (type === "fighting") btnStyle.push(classes.fighting);
        if (type === "psychic") btnStyle.push(classes.psychic);
        if (type === "ghost") btnStyle.push(classes.ghost);
        if (type === "rock") btnStyle.push(classes.rock);
        if (type === "ice") btnStyle.push(classes.ice);
        if (type === "dragon") btnStyle.push(classes.dragon);
        return btnStyle.join(' ');

    }


    const favCards = useSelector(state => state.favoriteReducer);
    // console.log("favcards", favCards);

    const handleAddFavorite = (card) => {
        console.log("is twice:", isTwice);
        const flag = isInFavorite(card);
        if (favCards.length >= FAVORITE_NUMBER) return false;
        if (!isTwice)
            dispatch(addToFavorite(obj));
    }


    const isInFavorite = (card) => {
        favCards.forEach(element => {
            console.log(element.pokeId, card.pokeId);
            console.log("inside:", (element.pokeId === card.pokeId));
            if (element.pokeId === card.pokeId) setIsTwice(true);
        });
    }

    const normalContent = (
        <div className={classes.pokeCard}>
            <Link to={`/pokemon/${pokeId} `}   >
                <img src={pic} className={classes.avatar} alt="pic" />
            </Link>
            <div className={classes.flex}>
                <div className={classes.id}>#{pokeId}</div>
                <div className={classes.name}>{name}</div>
                <div className={classes.types}>
                    {types && types.map(type => {
                        const btnStyle = [classes.type];
                        return (
                            <div className={matchClassTo(btnStyle, type)} >{type}</div>
                        )
                    })}
                </div>

            </div>
            <div className={classes.favIcon} onClick={() => handleAddFavorite(obj)}> {isTwice ? <div> <BsFillStarFill /></div> : <BsStar />}</div>
        </div>

    );

    // const detailed = true;

    let movesGrid = classes.detailGrid2;
    if (moves && moves.length > 10) movesGrid = classes.detailGrid3;
    if (moves && moves.length > 30) movesGrid = classes.detailGrid4;
    let gamesGrid = classes.detailGrid2;
    if (games && games.length > 10) gamesGrid = classes.detailGrid3;
    if (games && games.length > 30) gamesGrid = classes.detailGrid4;


    let content;
    const detailedcontent = (
        <div className={classes.pokeCardDetailed}>
            <Link to={`/ pokemon / ${pokeId} `}   >
                <img src={pic} className={classes.avatar} alt="pic" />
            </Link>
            <div className={classes.flexDetailed}>
                <div className={classes.idDetailed}>#{pokeId}</div>
                <div className={classes.nameDetailed}>{name}</div>
                <div className={classes.typesDetailed}>
                    {types && types.map(type => {
                        const btnStyle = [classes.typeDetailed];
                        return (
                            <div className={matchClassTo(btnStyle, type)} >{type}</div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.detailFlex}>
                <div className={classes.detailContainer}>
                    <div className={classes.detailTitle}>
                        evolved from
                        </div>
                    <div className={classes.detailData}>
                        {evolveFrom ? evolveFrom : "didn't evolve"}
                    </div>
                </div>
                <div className={classes.detailContainer}>
                    <div className={classes.detailTitle}>
                        can evolve to
                        </div>

                    {evolveChain && evolveChain.map(el => <div className={classes.detailData}>{el} </div>)}
                </div>
            </div>

            <div className={classes.detailFlex}>
                <div className={classes.detailContainer}>
                    <div className={classes.detailTitle}>
                        moves of pokemon
                    </div>
                    <div className={movesGrid}>
                        {moves && moves.map(el => <div className={classes.detailData}>{el} </div>)}
                    </div>

                </div>
            </div>
            <div className={classes.detailContainer}>
                <div className={classes.detailTitle}>
                    avilable in games
                </div>

                <div className={gamesGrid}>
                    {games && games.map(el => <div className={classes.detailData}>{el} </div>)}
                </div>
            </div>
        </div>


    );
    if (detailed) {
        content = detailedcontent;
    }
    else {
        content = normalContent;
    }


    return (

        <div >
            { content}
        </div>
    )
}

export default PokeCard
