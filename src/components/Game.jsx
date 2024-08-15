import React, { useState, useEffect } from 'react';

function Game() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
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
    
        // Si le serpent mange la nourriture
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
          });
        } else {
          // Supprime la dernière partie du serpent pour simuler le déplacement
          newSnake.pop();
        }
    
        // Vérifie les collisions avec les murs
        if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20) {
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
            gridTemplateColumns: `repeat(20, 20px)`, 
            gridTemplateRows: `repeat(20, 20px)`, 
            border: '1px solid #1BEB9E',
            margin: '5px'
          }}>
            {Array.from({ length: 20 * 20 }).map((_, i) => {
              const x = i % 20;
              const y = Math.floor(i / 20);
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