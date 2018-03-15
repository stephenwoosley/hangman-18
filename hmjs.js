
// Game object to hold variables and methods

var game = {
  userGuess: "",
  computerWord: "",
  solved: false,
  wordlist: ["DUKE", "CAROLINA", "CLEMSON", "NC STATE", "FLORIDA STATE", "MIAMI"],
  computerWordLetters: [],
  blankArray: [],
  resetGame: function() {
    this.userGuess = "";
  },
  playGame: function() {
    this.chooseComputerWord();
    this.listen();
  },
  listen: function() {
    document.onkeyup = function(event) {
      this.userGuess = event.key;
      console.log("User guess: " + this.userGuess);
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
  fillBlanks: function(computerWord) {
    for (let i = 0; i < computerWord.length; i++) {
      computerWord.push("_");
    }
  },
  updateBlanks: function(userGuess, computerWordLetters, blankArray) {
    // if user has not won
    if (!this.solved) {
      // fill the blanks array with, or output to the page, either a blank or a letter
      // 1. 
      for (var i = 0; i < blankArray.length; i++) {
        // if it's a blank & not a letter already, run the letter check
        if(blankArray[i] === "_" && userGuess === computerWordLetters[i]) {
          // replace the current blank with the userGuess
          blankArray[i] = userGuess;
        }
      } // end for loop
      console.log(blankArray);
    } // end if (!this.solved)
  }
}

// binds the chooseWord function to its game scope as opposed to Window, where it would be called from/bound to otherwise
//var boundChooseWord = game.chooseComputerWord.bind(game);
var boundListener = game.listen.bind(game);

//document.querySelector(".title").onclick = boundChooseWord;
// boundListener();
game.playGame();