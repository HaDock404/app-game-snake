import { isMobile, isTablet } from 'react-device-detect';
/*npm install react-device-detect permet de vérifier le type d'appareil*/
import '../styles/board.css'

function Board() {
    return (
        <div className='board'>
          {isMobile && isTablet ? (
            <div className='alert_message'>
              Cette application n'est pas disponible sur votre appareil merci d'y accéder avec un ordinateur
            </div>
          ) : (
            <div style={{color : 'white'}}>
                ok
            </div>
          )}
        </div>
      );
}

export default Board