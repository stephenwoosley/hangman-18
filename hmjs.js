
// Game object to hold variables and methods

var game = {
  userGuess: "",
  computerWord: "",
  solved: false,
  wordlist: ["DUKE", "CAROLINA", "CLEMSON", "NC STATE", "FLORIDA STATE", "MIAMI"],
  computerWordLetters: [],
  blankArray: [],
  winNumber: 0,
  resetGame: function() {
    this.userGuess = "";
    this.computerWord = "";
    this.solved = false;
    this.computerWordLetters = [];
    this.blankArray = [];
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
      gameObject.userGuess = event.key;
      console.log("User guess: " + gameObject.userGuess);
      gameObject.updateBlanks();
    }
  },
  chooseComputerWord: function() {
    var randomNum = Math.floor(Math.random()*this.wordlist.length);
    console.log("Random number: " + randomNum);
    this.computerWord = this.wordlist[randomNum];
    // fill computerWordLetters array with individual letters of word
    this.computerWordLetters = this.computerWord.split("");
    console.log("Computer word: " + this.computerWord);
    console.log("Letters of computer word: " + this.computerWordLetters);
  },
  fillBlanks: function() {
    // fill blankArray with a blank for each letter in computerWordLetters array
    for (let i = 0; i < this.computerWordLetters.length; i++) {
      if(this.computerWordLetters[i] === " "){
        console.log("FOUND A SPACE!!!")
      } 
      if(this.computerWordLetters[i] !== " "){
        this.blankArray.push("_");
      } 
    }
    console.log("Blank array: " + this.blankArray);
  },
  updateBlanks: function() {
    // if user has not won
    if (!this.solved) {
      // fill the blanks array with either a blank or a letter
      for (var i = 0; i < this.blankArray.length; i++) {
        // if it's a blank & not a letter already, run the letter check
        if(this.blankArray[i] === "_" && this.userGuess.toUpperCase() === this.computerWordLetters[i]) {
          // replace the current blank with the userGuess
          this.blankArray[i] = this.userGuess.toUpperCase();
          this.winNumber++;
        }
      } // end for loop
      console.log(this.blankArray);
      console.log(this.winNumber);
      if(this.winNumber === this.blankArray.length) {
        this.winSequence();
      }
    } // end if (!this.solved)
  }, // end updateBlanks
  winSequence: function() {
    console.log("YOU WIN!!!");
    this.resetGame();
  }
}

// blank array is the correct length
// problem is the space is still being taken into account when checking computerGuessedArray against the userGuess
// need to create a computerLetterArray that removes the space from the computer Word using .replace(/ /g, '')


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