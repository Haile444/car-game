import React, { useState, useEffect } from 'react';
import './CarRacingGame.css';

function CarRacingGame() {
  // Initial car position and movement speed
  const [carPosition, setCarPosition] = useState({ x: 50, y: 80 });
  const carSpeed = 5;

  // Functions to move the car in each direction
  const moveUp = () => setCarPosition((pos) => ({ ...pos, y: Math.max(0, pos.y - carSpeed) }));
  const moveDown = () => setCarPosition((pos) => ({ ...pos, y: Math.min(100, pos.y + carSpeed) }));
  const moveLeft = () => setCarPosition((pos) => ({ ...pos, x: Math.max(0, pos.x - carSpeed) }));
  const moveRight = () => setCarPosition((pos) => ({ ...pos, x: Math.min(100, pos.x + carSpeed) }));

  // Event listener for keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        default:
          break;
      }
    };

    // Attach event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="game-container">
      <Track />
      <Car position={carPosition} />

      {/* Control buttons */}
      <div className="controller">
        <button onClick={moveUp}>Up</button>
        <div>
          <button onClick={moveLeft}>Left</button>
          <button onClick={moveDown}>Down</button>
          <button onClick={moveRight}>Right</button>
        </div>
      </div>
    </div>
  );
}

// Track component representing the racing area
function Track() {
  return <div className="track">Track Area</div>;
}

// Car component that displays the car at a specified position
function Car({ position }) {
  return (
    <div
      className="car"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      🚗
    </div>
  );
}

export default CarRacingGame;
