import { isMobile, isTablet } from 'react-device-detect';
/*npm install react-device-detect permet de vérifier le type d'appareil*/
import React, { useState, useEffect } from "react";


import '../styles/board.css'
import Game from './Game';

function Board() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Le tableau vide [] signifie que cet effet n'est exécuté qu'une seule fois au montage du composant

    return (
        <div className='board'>
          {isMobile && isTablet ? (
            <div className='alert_message'>
              Cette application n'est pas disponible sur votre appareil merci d'y accéder avec un ordinateur
            </div>
          ) : (
            <div style={{color : 'white'}} className='main_board'>
              <Game 
              width={windowSize.width - 10}
              height={(windowSize.height - windowSize.height*0.10) - 10}
              />
            </div>
          )}
        </div>
      );
}

export default Board