// Game object to hold variables and methods

var game = {

  userGuess: "",
  computerWord: "",
  solved: false,
  wordlist: ["DUKE", "CAROLINA", "CLEMSON", "NC STATE", "FLORIDA STATE", "MIAMI"],
  computerWordLetters: [],
  blankArray: [],
  guessedLetters: [],
  winNumber: 0, // must equal number of letters (w/o spaces) in the word to win
  loseNumber: 8,
  wins: 0,
  losses: 0,

  resetGame: function() {
    this.userGuess = "";
    this.computerWord = "";
    this.solved = false;
    this.computerWordLetters = [];
    this.blankArray = [];
    this.guessedLetters = [];
    this.winNumber = 0;
    this.playGame();
  },

  playGame: function() {
    console.log("Welcome to Hangman!")
    this.chooseComputerWord();
    this.fillBlanks();
    this.listen();
  },

  listen: function() {
    // creates a scope holder
    gameObject = this;
    document.onkeyup = function(event) {
      // reset win/loss message on page
      document.querySelector(".instructions").innerHTML = "";
      gameObject.userGuess = event.key;
      console.log("User guess: " + gameObject.userGuess);
      gameObject.updateBlanks();
    }
  },

  chooseComputerWord: function() {
      // random number generation for word selection
    var randomNum = Math.floor(Math.random()*this.wordlist.length);
    console.log("Random number: " + randomNum);
      // choose random word from the list
    this.computerWord = this.wordlist[randomNum];
      // get rid of spaces
    var spacelessComputerWord = this.computerWord.replace(/ /g, '');
      // create array from the chosen word string
    this.computerWordLetters = spacelessComputerWord.split("");
    console.log("Computer word: " + this.computerWord);
    console.log("Letters of computer word: " + this.computerWordLetters);
  },

  fillBlanks: function() {
    // fill blankArray with a blank for each letter in computerWordLetters array
    for (let i = 0; i < this.computerWordLetters.length; i++) {
      if(this.computerWordLetters[i] !== " "){
        this.blankArray.push("_");
      }
    }
    console.log("Blank array: " + this.blankArray);
  },

  updateBlanks: function() {
    var gotALetterRight = false;
    // if user hasn't guessed this letter before
    if (this.guessedLetters.indexOf(this.userGuess.toUpperCase()) === -1) {   
      // fill the blanks array with either a blank or a letter
      this.guessedLetters.push(this.userGuess.toUpperCase());
      console.log("Guessed Letters: " + this.guessedLetters);
      for (var i = 0; i < this.blankArray.length; i++) {
        // if it's a blank & not a letter already, run the letter check
        if (this.blankArray[i] === "_" && this.userGuess.toUpperCase() === this.computerWordLetters[i]) {
          // replace the current blank with the userGuess
          this.blankArray[i] = this.userGuess.toUpperCase();
          // flipping this boolean to accurately tell if the guess was correct or incorrect
          gotALetterRight = true;
          // increase the Win Number
          this.winNumber++;
        }
      } // end for loop
      // if no blanks were filled, this is a wrong guess, increase the loseNumber
      if (!gotALetterRight) {
        this.loseNumber--;
      }
      console.log(this.blankArray);
      console.log("win number: " + this.winNumber);
      console.log("lose number: " + this.loseNumber);
      if (this.winNumber === this.blankArray.length) {
        this.winSequence();
      }
      if (this.loseNumber === 0) {
        this.loseSequence();
      }
    } // end if guessedLetters
    this.updateHTML();
  }, // end updateBlanks

  winSequence: function() {
    document.querySelector(".instructions").innerHTML = "You Win!!!";
    console.log("YOU WIN!!!");
    this.wins++
    // update wins on page
    this.resetGame();
  },

  loseSequence: function() {
    document.querySelector(".instructions").innerHTML = "You Lose!!!";
    console.log("YOU LOSE!");
    this.losses++
    // update losses on page
    this.resetGame();
  },
  
  updateHTML: function() {
    var blanksDiv = document.querySelector(".word-blanks");
    var guessedLettersDiv = document.querySelector(".guessed-letters");
    blanksDiv.innerHTML = "";
    guessedLettersDiv.innerHTML = "";
    // loop through array as is and print out each index to the page
    for (letter in this.blankArray) {
      blanksDiv.innerHTML += this.blankArray[letter]  + " ";
    }
    for (letter in this.guessedLetters) {
      guessedLettersDiv.innerHTML += this.guessedLetters[letter] + " ";
    }
    
  }
}

// implement alreadyGuessed Array
// add check for wether it's a letter or some other char

// 1. page loads
// 2. word selected and fills blanks in program + on page
// 3. user guesses letter
// 4. if not already guessed, guess letter added to guessed-letters array TODO
// 5. guess checked against word selected
// 6. if correct, show letter in place of blank, and check if user wins (all letters filled)
// 7. if incorrect, increase loss number count-up
// 

// binds the chooseWord function to its game scope as opposed to Window, where it would be called from/bound to otherwise
//var boundChooseWord = game.chooseComputerWord.bind(game);

game.playGame();