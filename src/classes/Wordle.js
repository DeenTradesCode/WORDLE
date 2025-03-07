const GREEN = "g";
const YELLOW = "y";
const BLACK = "b";


class Wordle {
  word;
  constructor(word) {
    this.word = word;
  }

  checkWord(guess) {
    if (guess.length !== this.word.length) {
      return [];
    }

    let result = [];
    let wordCopy = this.word.split(""); // Create a copy of the word to track matched letters.

    // First pass: Check for GREEN (correct letter in the correct position)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.word[i]) {
        result.push(GREEN);
        wordCopy[i] = null; // Mark this position as processed in the word copy
      } else {
        result.push(null); // Temporarily leave as null
      }
    }

    // Second pass: Check for YELLOW (correct letter, wrong position)
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === null && wordCopy.includes(guess[i])) {
        result[i] = YELLOW;
        wordCopy[wordCopy.indexOf(guess[i])] = null; // Mark this letter as processed
      }
      if (result[i] === null) {
        result[i] = BLACK; // If the letter is not in the word, mark it as BLACK
      }
    }

    return result;
  }

  // Letter repeated check
  letterRepeated(guess, index) {
    const letter = guess[index]; // Get the letter at the given index
    let countInGuess = 0;
    let countInWord = 0;
  
    // Count occurrences of the letter in the guess
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter) {
        countInGuess++;
      }
    }
  
    // Count occurrences of the letter in the wordle
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        countInWord++;
      }
    }
  
    // If the letter is repeated in the guess but only once in the word, return false
    if (countInGuess > 1 && countInWord === 1) {
      return false;
    }
  
    // If the letter is repeated in both the guess and the word, return true
    return countInGuess > 1 && countInGuess !== countInWord;
  }
}
module.exports = { Wordle, GREEN, YELLOW, BLACK };