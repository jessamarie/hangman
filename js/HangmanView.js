/* global $ */

class HangmanView {

  constructor (model) {
    this.model = model
    this.hangman = new Hangman($('.hangman'))
  }

  init () {
    this.input = $('.input')
    this.buttons = {
      playGame: $('.playGame'),
      instructions: $('instructions'),
      newGame: $('.newGame')
    }
    this.displays = {
      display: $('.display'),
      tutorial: $('#tutorial'),
      word: $('.word'),
      welcome: $('.welcome'),
      game: $('#game'),
      options: $('.options'),
      score: $('.score'),
      hangman: $('.hangman'),
      letters: $('.letters'),
      underscore: $('.underscore')
    }

    this.preRender()
    this.displays.letter = $('.letter')
    this.listen()
    this.postRender()
  }

  preRender () {
    this.renderLetters()
  }

  renderLetters () {
    var alphabet = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (var i = 1; i < alphabet.length; i++) {
      var $newRow = $('<div class="row"></div>')

      while (i % 7 !== 0 && i !== 27) {
        var $newDiv = $('<div class="letter"></div>')
        $($newDiv).addClass(alphabet[i])
        $newDiv.text(alphabet[i])
        $newRow.append($newDiv)
        i++
      }
      this.displays.letters.append($newRow)
    }
  }

  listen () {
    this.displays.letter.on('click', this.handleLetterClick.bind(this))
    this.input.keypress(this.handleWordEntry.bind(this))
    this.buttons.playGame.on('click', this.playGame.bind(this))
    this.buttons.newGame.on('click', this.playGame.bind(this))
  }

  handleLetterClick (e) {
    $(e.target).css('color', 'gray')

    this.model.setGuess(e.target.outerText)

    if (this.model.checkGuess()) {
      this.renderGuesses()

      if (this.model.wonGame()) { /* you won! */ }
    } else {
      // tear off limb ouch!

      if (this.model.lostGame()) { /* You lost :( */ }
    }
  }

  handleWordEntry (e) {
    if (e.which === 13) {
      // TODO: error check if val() === empty
      e.preventDefault()
      this.displays.word.addClass('hide')
      this.displays.underscore.removeClass('hide')

      /* TODO: make letters clickable */
      this.displays.letter.css('color', 'white')

      this.model.setWord(this.input.val())
      this.input.val('') // clears input

      this.renderGuesses()
      this.renderHangman()
    }
  }

  playGame () {
    /* TODO: make letters unclickable */
    this.displays.letter.css('color', 'white')
    this.displays.welcome.addClass('hide')
    this.displays.underscore.addClass('hide')
    this.displays.word.removeClass('hide')

    this.hangman.draw()
  }

  renderGuesses () {
    var guesses = this.model.getGuesses()
    this.displays.underscore.children('span').empty()

    for (var i = 0; i < guesses.length; i++) {
      var $newSpan = $('<span></span>')
      $newSpan.attr('class', guesses[i].toUpperCase())
      $newSpan.text(guesses[i] + ' ')
      this.displays.underscore.append($newSpan)
    }
  }

  renderHangman () {

    // draw

  }

  postRender () {
    // render score?
  }

} // end class

class Hangman {
  constructor (board) {
    this.board = board
    this.width = 0
    this.height = 0

    this.bodyParts = {}

    init()
  }

  init () {
    add('hair', [3, 2])
  }

  add (bodyPart, dimensions) {
    this.bodyParts.push({
      bodyPart: dimensions
    })
  }

  removeBodyPart () {
    this.bodyParts.pop()
  }

  draw () {
    var $canvas = $('<canvas></canvas>')

    if ($canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
}

    this.board.append($canvas)
  }

  setDim (width, height) {
    this.width = width
    this.height = height

    this.draw()
  }
}

if (module) module.exports = HangmanView
