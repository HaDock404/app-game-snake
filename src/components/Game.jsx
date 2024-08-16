import React, { useState, useEffect } from 'react';

function Game(props) {
    const screen_widht = props.width
    const screen_height = props.height

    const nb_box_width = Math.floor(screen_widht / 20)
    const nb_box_height = Math.floor(screen_height / 20)

    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);

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
          let newFoodPosition;
          do {
              newFoodPosition = {
                  x: Math.floor(Math.random() * nb_box_width),
                  y: Math.floor(Math.random() * nb_box_height)
              };
          } while (newSnake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
  
          setFood(newFoodPosition);
      } else {
          // Supprime la dernière partie du serpent pour simuler le déplacement
          newSnake.pop();
      }
  
      // Vérifie les collisions avec les murs
      if (head.x < 0 || head.y < 0 || head.x >= nb_box_width || head.y >= nb_box_height) {
          setGameOver(true);
      } else {
          setSnake(newSnake);
      }
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
        const gameInterval = setInterval(moveSnake, 200);

        return () => {
        clearInterval(gameInterval);
        };
    }, [moveSnake]);


    return (
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
          {gameOver && <h2>Game Over!</h2>}
        </div>
      );
}

export default Game