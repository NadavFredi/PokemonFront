import React from 'react';
import classes from './Navbar.module.css';
import logo from '../../assets/images/logo-pokemon.png';
import { BsFillStarFill } from "react-icons/bs";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className="Container">
                <div className={classes.flex}>
                    <Link to='/'>
                        <img src={logo} alt="logo" className={classes.flexItem} />
                    </Link>
                    <Link to="/favorites">
                        <div className={classes.flexItem}>
                            <BsFillStarFill className={classes.favoriteLogo} size="1.5rem" color="#e6bc2f" />
                    favorites
                    </div>
                    </Link>


                </div>


            </div>
        </div>
    )
}

export default Navbar
