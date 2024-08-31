import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from './LanguageContext';

function Game(props) {
    const screen_widht = props.width
    const screen_height = props.height

    const nb_box_width = Math.floor(screen_widht / 20)
    const nb_box_height = Math.floor(screen_height / 20)

    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [speed, setSpeed] = useState(200);  // Vitesse initiale
    const [applesEaten, setApplesEaten] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [previousFoodPosition, setPreviousFoodPosition] = useState(null);

    const { language } = useContext(LanguageContext);

    const welcome = {
        en: 'Welcome to my Snake Game.',
        fr: 'Bienvenue dans mon jeu du Serpent.'
    };

    const instruction = {
        en: 'Catch as many apples as possible to get the best score.',
        fr: 'Attrapez le plus de pommes possible afin d\'avoir le meilleur score.'
    };

    const instruction2 = {
      en: 'Use the directional arrows to play.',
      fr: 'Utilisez les flèches directionnelles pour jouer.'
  };

    const start = {
      en: 'Start',
      fr: 'Jouer'
    };

    const game_over = {
      en: 'Game Over',
      fr: 'Perdu!'
    };

    const restart = {
      en: 'Restart Game',
      fr: 'Rejouer'
    };

    const thx_data = {
      en: 'Try again!',
      fr: 'Essaye encore!'
    };

    const moveSnake = () => {
      if (gameOver) return;
  
      const newSnake = [...snake];
      const head = { ...newSnake[0] };
  
      switch (direction) {
          case 'UP':
              head.y -= 1;
              break;
          case 'DOWN':
              head.y += 1;
              break;
          case 'LEFT':
              head.x -= 1;
              break;
          case 'RIGHT':
              head.x += 1;
              break;
          default:
              break;
      }
  
      // Ajoute la nouvelle position de la tête
      newSnake.unshift(head);
  
      // Vérifie les collisions avec le corps du serpent
      if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return;
      }
  
      // Si le serpent mange la nourriture
      if (head.x === food.x && head.y === food.y) {
          setPreviousFoodPosition(food);
          let newFoodPosition;
          do {
              newFoodPosition = {
                  x: Math.floor(Math.random() * nb_box_width),
                  y: Math.floor(Math.random() * nb_box_height)
              };
          } while (newSnake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
  
          setFood(newFoodPosition);
          setApplesEaten(applesEaten + 1); // Augmenter le compteur de pommes mangées
          adjustSpeed(applesEaten + 1);
      } else {
          // Supprime la dernière partie du serpent pour simuler le déplacement
          newSnake.pop();
      }
  
      // Vérifie les collisions avec les murs
      if (head.x < 0 || head.y < 0 || head.x >= nb_box_width || head.y >= nb_box_height) {
          setGameOver(true);
          sendGameData();
      } else {
          setSnake(newSnake);
      }
  };

  const adjustSpeed = (apples) => {
    if (apples < 16) {
        setSpeed(200 - apples * 10);
    }
  };

  const sendGameData = () => {
    const endTime = new Date().getTime();
    const gameTime = endTime - startTime;
    const snakeHeadPosition = snake[0];

    const data = {
        score: applesEaten,
        game_time: gameTime,
        snake_head_position: snakeHeadPosition,
        current_food_position: food,  
        previous_food_position: previousFoodPosition, // Position précédente de la pomme
        board_width: nb_box_width,
        board_height: nb_box_height
    };

    fetch('https://0fdf-84-121-194-87.ngrok-free.app/recover_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to send data to API');
            console.log(JSON.stringify(data));
        } else {
            console.log('Data sent successfully');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };
  

      useEffect(() => {
        const handleKeyPress = (e) => {
          switch (e.key) {
            case 'ArrowUp':
              if (direction !== 'DOWN') setDirection('UP');
              break;
            case 'ArrowDown':
              if (direction !== 'UP') setDirection('DOWN');
              break;
            case 'ArrowLeft':
              if (direction !== 'RIGHT') setDirection('LEFT');
              break;
            case 'ArrowRight':
              if (direction !== 'LEFT') setDirection('RIGHT');
              break;
            default:
              break;
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [direction]);
    
      // Utilise useEffect pour faire bouger le serpent à intervalles réguliers
    useEffect(() => {
        const gameInterval = setInterval(moveSnake, speed);

        return () => {
        clearInterval(gameInterval);
        };
    }, [moveSnake, speed]);

    const startGame = () => {
      setGameStarted(true);
      setGameOver(false);
      setSnake([{ x: 0, y: 0 }]);
      setDirection('RIGHT');
      setFood({ x: 15, y: 15 });
      setSpeed(200); // Réinitialiser la vitesse
      setApplesEaten(0); // Réinitialiser le compteur de pommes mangées
      setStartTime(new Date().getTime());
    };


    return (
      <div>
          {!gameStarted ? (
              <div style={{
                backgroundColor: 'black',
                width: '100%',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'sans-serif'
              }}>
                  <h1 style={{
                    color: '#1BEB9E'
                  }}
                  >{welcome[language]}</h1>
                  <div style={{
                    color: '#1BEB9E'
                  }}
                  >{instruction[language]}</div>
                  <div style={{
                    color: '#1BEB9E'
                  }}
                  >{instruction2[language]}</div>
                  <button onClick={startGame} style={{
                    backgroundColor: '#1BEB9E',
                    color: 'black',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s, transform 0.3s',
                    margin: '10px'
                  }}>{start[language]}</button>
              </div>
          ) : (
              <div>
                  <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${nb_box_width}, 20px)`,
                      gridTemplateRows: `repeat(${nb_box_height}, 20px)`,
                      border: '1px solid #1BEB9E',
                      margin: '5px'
                  }}>
                      {Array.from({ length: nb_box_width * nb_box_height }).map((_, i) => {
                          const x = i % nb_box_width;
                          const y = Math.floor(i / nb_box_width);
                          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                          const isFood = food.x === x && food.y === y;

                          return (
                              <div
                                  key={i}
                                  style={{
                                      width: '20px',
                                      height: '20px',
                                      backgroundColor: isSnake ? '#1BEB9E' : isFood ? 'red' : 'black',
                                      border: '1px solid #1BEB9E'
                                  }}
                              />
                          );
                      })}
                  </div>
                  {gameOver && (
                        <div style={{
                            fontFamily: 'sans-serif',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            backgroundColor: 'black',
                            padding: '20px',
                            borderRadius: '10px',
                            color: '#1BEB9E'
                        }}>
                            <h2>{game_over[language]}</h2>
                            <div style={{
                              margin: '5px'
                            }}>Score: {applesEaten}</div>
                            <div style={{
                              margin: '10px'
                            }}>{thx_data[language]}</div>
                            <button onClick={startGame} style={{
                              backgroundColor: '#1BEB9E',
                              color: 'black',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '10px 20px',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                              transition: 'background-color 0.3s, transform 0.3s',
                              margin: '0px'
                            }}>{restart[language]}</button>
                        </div>
                    )}
              </div>
          )}
      </div>
  );
}

export default Game