import '../styles/header.css';
import { Link } from 'react-router-dom'; //obligatoire avec hashrouter
import Worldicon from './Wordicon.jsx';
import Dropdown from './Dropdown.jsx';

import React, { useState } from 'react'; // Importation de useState pour le menu hamburger

function Header() {

    return (
        <header>
            <nav className='header_nav'>
                <Link to="/" className='home_logo'>
                    Snake Game
                </Link>
                <div className='lang-menu'>
                    <Worldicon />
                    <Dropdown />
                </div>
            </nav>
        </header>
    )
}

export default Header