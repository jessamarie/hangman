// Have a player enter a word that will be guessed during the game.
// The word is then hidden and represented by blank spaces.
// The second player then chooses letters, which are revealed if present.
//
// Bonus:
//
// Add timer-based scoring
// Track scores across games (even if the page is reloaded)

/* global $ HangmanView WindowView HangmanModel */

$(document).ready(function () {
  var model = new HangmanModel()
  var hangmanView = new HangmanView(model)
  var windowView = new WindowView(hangmanView, model)
  windowView.init()
}) // end ready
