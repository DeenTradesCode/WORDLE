import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';  
import { Wordle, GREEN, YELLOW, BLACK } from './classes/Wordle'; 
import fiveLetterWords from './classes/fiveLetterWords.js'; 


const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
  return fiveLetterWords[randomIndex];
};

const WordleGame = () => {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState('');
  const [wordle, setWordle] = useState(new Wordle(getRandomWord())); 

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmitGuess = () => {
    if (guess.length !== 5) {
      setMessage('Please enter a 5-letter word');
      return;
    }
    const result = wordle.checkWord(guess);
    setAttempts([...attempts, { guess, result }]);
    setGuess('');
    if (result.every((color) => color === GREEN)) {
      setMessage('Congratulations! You guessed the word!');
    } else {
      setMessage('Try again!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Wordle Game</h1>
      <h2>Guess the 5-letter word!</h2>
      <input
        type="text"
        value={guess}
        onChange={handleGuessChange}
        maxLength={5}
        placeholder="Enter your guess"
        onKeyPress={handleKeyPress}  
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />
      <button
        onClick={handleSubmitGuess}
        style={{ padding: '10px', fontSize: '16px' }}
      >
        Submit Guess
      </button>

      <p>{message}</p>

      <div>
        <h3>Attempts:</h3>
        {attempts.map((attempt, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <span>{attempt.guess.toUpperCase()} - </span>
            {attempt.result.map((color, i) => (
              <span
                key={i}
                className={color === GREEN ? 'green' : color === YELLOW ? 'yellow' : 'black'}
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                {attempt.guess[i].toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Render the Wordle game to the root element in index.html
ReactDOM.render(<WordleGame />, document.getElementById('root'));
