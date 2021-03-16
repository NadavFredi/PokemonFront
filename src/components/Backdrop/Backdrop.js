import React from 'react'
import classes from './Backdrop.module.css';
const Backdrop = ({ show, toggle }) => {
    return (
        <div className={classes.backdrop}>
            {show && <div>backdrop</div>}
        </div>
    )
}

export default Backdrop
