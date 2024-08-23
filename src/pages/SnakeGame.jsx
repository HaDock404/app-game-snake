import React, { useState, useEffect } from 'react';
import Board from '../components/Board.jsx';
import Header from '../components/Header.jsx';
import '../styles/snakegame.css';

import { isMobile, isTablet } from 'react-device-detect';

function SnakeGame() {
    const [isScreenSmall, setIsScreenSmall] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.innerWidth < 651 || window.innerHeight < 500;
            setIsScreenSmall(isSmall);
        };

        // Vérifie la taille initiale de l'écran
        checkScreenSize();

        // Écoute les changements de taille de la fenêtre
        window.addEventListener('resize', checkScreenSize);

        // Nettoie l'écouteur d'événements lorsque le composant est démonté
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            {isMobile || isTablet || isScreenSmall ? (
                <div style={{
                    color: 'red',
                    fontSize: '30px',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    Cette application n'est pas disponible sur votre appareil ou la taille de votre écran est trop petite. Merci d'y accéder avec un ordinateur ou d'agrandir la fenêtre.
                </div>
            ) : (
                <div>
                    <Header />
                    <Board />
                </div>
            )}
        </>
    );
}

export default SnakeGame;
