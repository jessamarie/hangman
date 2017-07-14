class HangmanModel {

  constructor () {
    this.word = ''
    this.guess = ''
    this.guesses = []
    this.length = 0
    this.incorrectGuesses = 0
    this.bodyPartsLength = 0
    this.correctGuesses = 0
  }

  setBodyPartsLength (length) {
    this.bodyPartsLength = length
  }

  setGuess (letter) {
    this.guess = letter
  }

  checkGuess (guess) {
    var index = this.word.indexOf(guess)

    if (index === -1) {
      this.incorrectGuesses += 1
      return 0
    }

    while (index < this.word.length && index !== -1) {
      this.revealLetter(index, this.word[index])
      index++
      index = this.word.indexOf(guess, index)
    }

    return 1
  }

  revealLetter (index, letter) {
    this.guesses[index] = letter
    this.correctGuesses += 1
  }

  getGuesses () {
    return this.guesses
  }

  wonGame () {
    return this.correctGuesses === this.length
  }

  lostGame () {
    return this.incorrectGuesses === this.bodyPartsLength
  }

  setWord (word) {
    this.word = word.toUpperCase()
    this.length = word.length
    this.guesses = []

    for (var i = 0; i < word.length; i++) {
      this.guesses.push('_')
    }
  }

}

if (module) module.exports = HangmanModel
