
// Game object to hold variables and methods

var game = {
  userGuess: "",
  wordlist: ["Duke", "Carolina", "Clemson", "NC State", "Florida State", "Miami"],
  resetGame: function() {
    this.userGuess = "";
  },
  listen: function() {
    document.onkeyup = function(event) {
      console.log(this.userGuess);
      console.log(this.wordlist[0]);
      this.userGuess = event.key;
      console.log(this.userGuess);
    }
  },
  chooseWord: function() {
    var length = game.wordlist.length;
    var randomWord = Math.floor(Math.random()*length)+1;
    console.log(randomWord);
  }
}

document.querySelector(".title").onclick = game.chooseWord;
game.listen();