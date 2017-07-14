const regEx = /^[a-zA-Z\-]+$/

class HangmanModel {

  constructor () {
    this.word = ''
    this.bodyPartsLength = 0

    this.init()
  }

  init () {
    this.guesses = []
    this.length = 0
    this.incorrectGuesses = 0
    this.correctGuesses = 0
  }

  /*
  sets the length of the number of body parts of
  the hangman
  */
  setBodyPartsLength (length) {
    this.bodyPartsLength = length
  }

  /*
  checks if the guess is in the array and updates
  the guesses array. If not,
  return 0, else return 1
  */
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

  /*
  updates the guesses array with the letter
  */
  revealLetter (index, letter) {
    this.guesses[index] = letter
    this.correctGuesses += 1
  }

  /*
  returns the guesses array
  */
  getGuesses () {
    return this.guesses
  }

  /*
  checks if the user has won the game
  */
  wonGame () {
    return this.correctGuesses === this.length
  }

  /*
  checks if the user has lost the game
  */
  lostGame () {
    return this.incorrectGuesses === this.bodyPartsLength
  }

  getType (elem) {
    if (elem.match(regEx)) { return '_' } else if (elem.match(' ')) {
      return '&nbsp'
    } else {
      return elem
    }
  }

  /*
  sets the word being played and initializes variables
  */
  setWord (word) {
    this.init()

    this.word = word.toUpperCase()
    var wordArray = word.split('')
    this.guesses = []

    this.guesses = wordArray.map((elem) => {
      return this.getType(elem)
    })

    var onlyLettersArray = wordArray.filter((elem) => {
      return elem.match(regEx)
    })

    this.length = onlyLettersArray.length
  }

}

if (module) module.exports = HangmanModel
