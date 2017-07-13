class HangmanModel {

  constructor () {
    this.word = ''
    this.guess = ''
    this.guesses = []
    this.length = 0
    this.incorrectGuesses = 0
    this.correctGuesses = 0
  }

  setGuess (letter) {
    this.guess = letter
  }

  getGuess () {
    return this.guess
  }

  checkGuess () {
    var index = this.word.indexOf(this.getGuess())

    if (index === -1) {
      return 0
    }

    while (index < this.word.length && index !== -1) {
      console.log(this.word[index])
      this.revealLetter(index, this.word[index])
      index++
      index = this.word.indexOf(this.getGuess(), index)
    }

    console.log(this.guesses)
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

  }

  getCorrectGuesses () {
    return this.correctGuesses
  }

  setWord (word) {
    this.word = word.toUpperCase()
    this.length = word.length
    this.guesses = []

    for (var i = 0; i < word.length; i++) {
      this.guesses.push('_')
    }
  }

  getWord () {
    return this.word
  }
}

if (module) module.exports = HangmanModel
