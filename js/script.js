// Have a player enter a word that will be guessed during the game.
// The word is then hidden and represented by blank spaces.
// The second player then chooses letters, which are revealed if present.
//
// Bonus:
//
// Add timer-based scoring
// Track scores across games (even if the page is reloaded)

$(document).ready(function () {

}) // end ready

/* global $ */
console.log('get coding!')

setTimeout(function () {

//  $('#welcome').addClass('hide')
//   $('#game').removeClass('hide')

}, 100)

$('#welcome').addClass('hide')
$('#game').removeClass('hide')

var alphabet = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var makeLetters = function () {
  var $letters = $('.letters')
  for (var i = 1; i < alphabet.length; i++) {
    var $newRow = $('<div class="row"></div>')

    while (i % 7 !== 0 && i !== 27) {
      var $newDiv = $('<div class="letter"></div>')
      $($newDiv).attr('id', alphabet[i])
      $newDiv.text(alphabet[i])
      $newRow.append($newDiv)
      i++
    }
    $letters.append($newRow)
  }
}

makeLetters()
