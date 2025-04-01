
export const GREEN = "g";
export const YELLOW = "y";
export const BLACK = "b";

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
    let wordCopy = this.word.split("");

    
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === this.word[i]) {
        result.push(GREEN);
        wordCopy[i] = null;
      } else {
        result.push(null); 
      }
    }

   
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === null && wordCopy.includes(guess[i])) {
        result[i] = YELLOW;
        wordCopy[wordCopy.indexOf(guess[i])] = null; 
      }
      if (result[i] === null) {
        result[i] = BLACK; 
      }
    }

    return result;
  }

  letterRepeated(guess, index) {
    const letter = guess[index]; 
    let countInGuess = 0;
    let countInWord = 0;
  
    
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter) {
        countInGuess++;
      }
    }
  
  
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        countInWord++;
      }
    }
  
    
    if (countInGuess > 1 && countInWord === 1) {
      return false;
    }
  
    
    return countInGuess > 1 && countInGuess !== countInWord;
  }
}

export { Wordle }; 
