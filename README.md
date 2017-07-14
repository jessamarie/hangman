# Reverse hangman
A game developed for WDI Project 1, reverse hangman puts a twist on the original hangman game. Instead of adding body parts every time the player guesses incorrectly, you are already hanging and body parts are cut off! Woah.

# languages used
HTML5, CSS3, JQuery, and JCanvas

# Bronze Features
- Structure:
  - Hangman
  - Word Rendering
  - Letters
- Basic styling
- Behavior:
  - The play game, and new game buttons work
  - The input box retrieves a word from the player
  - A letter click results in one of two cases:
    A. The letter is correct and re-renders the word
    B. The letter is incorrect and cuts off a body part
  - Correct word logic
    A. Words with spaces
    B. Words with repeat letters

# Silver Features
- Hide-Show elements in Structure
  - Opening page: playGame/tutorial
  - choose word page: single input body
  - tutorial page: basic instructions
  - game page: hangman, letters, underscores, new game
- Sounds when body parts removeds
- Letters become unclickable after first click
- background music
- The 'original hangman' game. On input word page:
  - add two buttons, play original and play normal

# Gold Features
- add tutorial images
- add scoring system
- add animations
- random words
