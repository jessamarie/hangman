/* global $ */

const alphabet = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lettersPerRow = 5
const reset = 0
const enterKey = 13

class WindowView {

  constructor (view, model) {
    this.model = model
    this.hangman = view
  }

  init () {
    this.input = $('.input')
    this.buttons = {
      playGame: $('.playGame'),
      instructions: $('.instructions'),
      newGame: $('.newGame')

      // later add
      // .original button
      // .normal button
    }
    this.displays = {
      display: $('.display'),
      tutorial: $('#tutorial'),
      word: $('.word'),
      welcome: $('.welcome'),
      game: $('#game'),
      letters: $('.letters'),
      underscore: $('.underscore')
    }

    this.initGame()
  }

  initGame () {
    this.renderLetters()
    this.displays.letter = $('.letter')
    this.listen()
    $('.audio').trigger('load')
  }

  /* Renders Letters A-Z onto the screen */
  renderLetters () {
    for (var i = 1; i < alphabet.length; i++) {
      var $newRow = $('<div class="row"></div>')

      while (i !== 27) {
        var $newDiv = $('<div class="letter"></div>').addClass(alphabet[i]).text(alphabet[i])
        $newRow.append($newDiv)

        if (i % lettersPerRow === 0) { break } // five letters per row
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
    this.buttons.instructions.on('click', this.showTutorial.bind(this))
    // add originalGame listener and handle function
    // then create proper init in hangman view
  }

  makeUnclickable (elem) {
    elem.removeClass('clickable')
    elem.addClass('unclickable')
  }

  makeClickable (elem) {
    elem.removeClass('unclickable')
    elem.addClass('clickable')
  }

  showTutorial () {
    this.displays.word.addClass('hide')
    this.displays.game.addClass('hide')

    this.displays.tutorial.removeClass('hide')
    this.displays.welcome.removeClass('hide')
  }

  showGame () {
    this.displays.word.addClass('hide')
    this.displays.welcome.addClass('hide')
    this.displays.tutorial.addClass('hide')

    this.displays.game.removeClass('hide')
  }

  showWelcome (elem) {
    this.displays.word.addClass('hide')
    this.displays.game.addClass('hide')
    this.displays.tutorial.addClass('hide')

    this.displays.welcome.removeClass('hide')
  }

  showInput (elem) {
    this.displays.welcome.addClass('hide')
    this.displays.game.addClass('hide')
    this.displays.tutorial.addClass('hide')

    this.displays.word.removeClass('hide')
  }

  goodGuess () {
    this.renderGuesses()

    if (this.model.wonGame()) {
      this.playAudio($('.cheering'))
      this.makeUnclickable(this.displays.letter)
    } else {
      // user cheering here and clapping above?
    }
  }

  badGuess () {
    this.hangman.removeBodyPart()

    if (this.model.lostGame()) {
      this.playAudio($('.decapitation'))
      this.makeUnclickable(this.displays.letter)
    } else {
      this.playAudio($('.torture'))
    }
  }

  /* plays the sound element passed in */
  playAudio (sound) {
    $('audio').trigger('pause').prop('currentTime', reset)
    sound.trigger('play')
  }

/* renders the letter unclickable and updates
 the guesses  */
  handleLetterClick (e) {
    this.makeUnclickable($(e.target))

    if (this.model.checkGuess(e.target.outerText)) {
      this.goodGuess()
    } else {
      this.badGuess()
    }
  }

  handleWordEntry (e) {
    if (e.which === enterKey) {
      if (this.input.val() !== '') {
        e.preventDefault()

        this.model.setWord(this.input.val())
        this.input.val('') // clears input

        this.setupGame()
      }
    }
  }

  setupGame () {
    this.showGame()

    this.renderGuesses()

    this.hangman.resizeCanvas()
  }

  playGame () {
    this.makeClickable(this.displays.letter)

    this.showInput()

    this.hangman.initHangman()
  }

  /* This will be for the original hangman
  game to be added */
  playOriginalHangman () {

  }

  /* This replaces/adds one underscore on the viewport */
  renderGuess (letter) {
    var $newSpan = $('<span></span>')
    .attr('class', letter.toUpperCase())
    .html(letter + ' ')

    this.displays.underscore.append($newSpan)
  }

  /* render the underscores/guessed letters to the viewport */
  renderGuesses () {
    var guesses = this.model.getGuesses()
    this.displays.underscore.children('span').empty()

    guesses.map((letter) => {
      this.renderGuess(letter)
    })
  }

} // end class

if (module) module.exports = WindowView
