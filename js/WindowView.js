/* global $ */

class WindowView {

  constructor (view, model) {
    this.model = model
    this.hangman = view
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
      this.hangman.removeBodyPart()

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
      this.hangman.resizeCanvas()
    }
  }

  playGame () {
    /* TODO: make letters unclickable */
    this.displays.letter.css('color', 'white')
    this.displays.welcome.addClass('hide')
    this.displays.underscore.addClass('hide')
    this.displays.word.removeClass('hide')
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

if (module) module.exports = WindowView
