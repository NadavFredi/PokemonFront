import React from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/images/logo-pokemon.png';
import { BsFillStarFill } from "react-icons/bs";


const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className="Container">
                <div className={classes.flex}>
                    <img src={logo} alt="logo" className={classes.flexItem} />
                    <div className={classes.flexItem}>
                        <BsFillStarFill className={classes.favoriteLogo} size="1.5rem" color="#e6bc2f" />
                    favorites
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Navbar
