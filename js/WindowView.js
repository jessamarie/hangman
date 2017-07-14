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
      letters: $('.letters'),
      underscore: $('.underscore')
    }

    this.renderLetters()
    this.displays.letter = $('.letter')
    this.listen()

    $('.audio').trigger('load')
  }

  renderLetters () {
    var alphabet = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (var i = 1; i < alphabet.length; i++) {
      var $newRow = $('<div class="row"></div>')

      while (i !== 27) {
        var $newDiv = $('<div class="letter"></div>')
        $($newDiv).addClass(alphabet[i])
        $newDiv.text(alphabet[i])
        $newRow.append($newDiv)

        if (i % 5 === 0) { break }
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
    $(e.target).css('pointer-events', 'none')

    console.log('Im here')

    if (this.model.checkGuess(e.target.outerText)) {
      this.renderGuesses()

      if (this.model.wonGame()) {
        $('audio').trigger('pause').prop('currentTime', 0)
        $('.cheering').trigger('play')
      }
    } else {
      this.hangman.removeBodyPart()

      if (this.model.lostGame()) {
        $('audio').trigger('pause').prop('currentTime', 0)
        $('.decapitation').trigger('play')
      } else {
        $('audio').trigger('pause').prop('currentTime', 0)
        $('.torture').trigger('play')
      }
    }
  }

  handleWordEntry (e) {
    if (e.which === 13) {
      if (this.input.val() !== '') {
      // TODO: error check if val() === empty
        e.preventDefault()
        this.displays.word.addClass('hide')
        this.displays.game.removeClass('hide')

      /* TODO: make letters clickable */
        this.displays.letter.css('color', 'black')

        this.model.setWord(this.input.val())
        this.input.val('') // clears input

        this.renderGuesses()
        this.hangman.resizeCanvas()
      }
    }
  }

  playGame () {
    /* TODO: make letters unclickable */
    this.displays.letter.css('color', 'black')
    this.displays.letter.css('pointer-events', 'auto')

    this.displays.welcome.addClass('hide')
    this.displays.game.addClass('hide')
    this.displays.word.removeClass('hide')

    this.hangman.initHangman()
  }

  renderGuesses () {
    var guesses = this.model.getGuesses()
    this.displays.underscore.children('span').empty()

    for (var i = 0; i < guesses.length; i++) {
      var $newSpan = $('<span></span>')
      $newSpan.attr('class', guesses[i].toUpperCase())
      $newSpan.html(guesses[i] + ' ')
      this.displays.underscore.append($newSpan)
    }
  }

} // end class

if (module) module.exports = WindowView
