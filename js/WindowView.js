/* global $ */

const alphabet = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lettersPerRow = 5
const reset = 0
const enterKey = 13
const randomList = [
  'elephant',
  'hangman',
  'wdi',
  'awesome',
  'jessa',
  'javascript',
  'washington',
  'virginia']

class WindowView {

  constructor (view, model) {
    this.model = model
    this.hangman = view
    this.gameType = function () { this.hangman.removeBodyPart() } // default
  }

  setGameType (type) {
    this.gameType = type
  }

  init () {
    this.input = $('.input')
    this.buttons = {
      playGame: $('.playGame'),
      instructions: $('.instructions'),
      newGame: $('.newGame'),
      original: $('.original'),
      normal: $('.normal'),
      random: $('.random')

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
    this.buttons.normal.on('click', this.handleNormalGame.bind(this))
    this.buttons.original.on('click', this.handleOriginalGame.bind(this))
    this.buttons.playGame.on('click', this.playGame.bind(this))
    this.buttons.newGame.on('click', this.playGame.bind(this))
    this.buttons.instructions.on('click', this.showTutorial.bind(this))
    this.buttons.random.on('click', this.getRandomWord.bind(this))
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
      this.playAudio($('.clapping'))
      this.makeUnclickable(this.displays.letter)
    } else {
      this.playAudio($('.cheering'))
    }
  }

  badGuess () {
    this.gameType()

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

  handleNormalGame () {
    if (this.setWordFromInput()) {
      this.hangman.setNormalGame()

      this.setupGame()
    }
  }

  handleOriginalGame () {
    if (this.setWordFromInput()) {
      var type = function () { this.hangman.addBodyPart() }

      this.setGameType(type)

      this.hangman.setOriginalGame()

      this.setupGame()
    }
  }

  setWordFromInput () {
    if (this.input.val() !== '') {
      this.model.setWord(this.input.val())
      this.input.val('') // clears input

      return 1
    } else {
      return 0
    }
  }

  handleWordEntry (e) {
    if (e.which === enterKey) {
      e.preventDefault()

      if (this.setWordFromInput()) {
        this.hangman.setNormalGame()
        this.setupGame()
      }
    }
  }

  setWordFromList (index) {
    this.model.setWord(randomList[index])
    this.input.val('') // clears input just in case
  }

  getRandomWord (e) {
    var rand = Math.floor(Math.random() * randomList.length)
    this.setWordFromList(rand)
    this.hangman.setNormalGame()
    this.setupGame()
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
