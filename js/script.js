// Have a player enter a word that will be guessed during the game.
// The word is then hidden and represented by blank spaces.
// The second player then chooses letters, which are revealed if present.
//
// Bonus:
//
// Add timer-based scoring
// Track scores across games (even if the page is reloaded)

/* global $ HangmanView HangmanModel */

$(document).ready(function () {
  var hangmanModel = new HangmanModel()
  var hangmanView = new HangmanView(hangmanModel)
  hangmanView.init()
}) // end ready
