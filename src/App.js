import React, { useState } from 'react';
import { getRandomWord, isValidWord } from './classes/fiveLetterWords'; 

const App = () => {
  const [guess, setGuess] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [wordleWord, setWordleWord] = useState(getRandomWord()); 
  const [attempts, setAttempts] = useState(0); 
  const [guessedWords, setGuessedWords] = useState([]); 

  const handleSubmitGuess = () => {
    
    if (isValidWord(guess)) {
      setGuessedWords([...guessedWords, guess]); 
      setAttempts(attempts + 1); 

      if (guess === wordleWord) {
        setMessage("Congratulations! You've guessed the word!");
      } else {
        setMessage("Incorrect guess. Try again!");
      }
    } else {
      setMessage("Invalid word! Please enter a valid 5-letter word.");
    }

    setGuess(""); 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Wordle Game</h1>
      <h2>Guess the 5-letter word!</h2>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={5}
        placeholder="Enter your guess"
        style={{ padding: "10px", fontSize: "16px", marginBottom: "20px" }}
      />
      <button 
        onClick={handleSubmitGuess} 
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Submit Guess
      </button>
      
      <p>{message}</p>

      <h3>Attempts: {attempts}</h3>

      <div>
        <h3>Guessed Words:</h3>
        <ul>
          {guessedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
