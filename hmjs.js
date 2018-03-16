
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
    this.fillBlanks();
    this.listen();
  },
  listen: function() {
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
      this.blankArray.push("_");
    }
    console.log("Blank array: " + this.blankArray);
  },
  updateBlanks: function() {
    // if user has not won
    if (!this.solved) {
      // fill the blanks array with, or output to the page, either a blank or a letter
      for (var i = 0; i < this.blankArray.length; i++) {
        // if it's a blank & not a letter already, run the letter check
        if(this.blankArray[i] === "_" && this.userGuess.toUpperCase() === this.computerWordLetters[i]) {
          // replace the current blank with the userGuess
          console.log("should be replacing")
          this.blankArray[i] = this.userGuess.toUpperCase();
        }
        console.log(this.blankArray)
      } // end for loop
      console.log(this.blankArray);
    } // end if (!this.solved)
  }
}

// binds the chooseWord function to its game scope as opposed to Window, where it would be called from/bound to otherwise
//var boundChooseWord = game.chooseComputerWord.bind(game);
//var boundListener = game.listen.bind(game);

//document.querySelector(".title").onclick = boundChooseWord;
// boundListener();
game.playGame();