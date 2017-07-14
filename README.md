# Reverse hangman
A game developed for WDI Project 1, reverse hangman puts a twist on the original hangman game. Instead of adding body parts every time the player guesses incorrectly, you are already hanging and body parts are cut off! Woah.

# languages used
HTML5, CSS3, JQuery, and JCanvas

# Bronze Features (+ = features added, - = yet to be implemented)
+ Structure:
  + Hangman
  + Word Rendering
  + Letters
+ Basic styling
+ Behavior:
  + The play game, and new game buttons work
  + The input box retrieves a word from the player
  + A letter click results in one of two cases:
    + The letter is correct and re-renders the word
    + The letter is incorrect and cuts off a body part
  + Letters become unclickable after first click and last move
  + Correct word logic
    + Words with spaces
    + Words with repeat letters

# Silver Features
+ Hide-Show elements in Structure
  + Opening page: playGame/tutorial
  + choose word page: single input body
  + game page: hangman, letters, underscores, new game
  + tutorial page: show basic instructions
+ Sounds when body parts removed
- The 'original' (more boring) hangman game.
  - structure:
    - on word page: a button for normal game
    - and for original game
  - Behavior:
    - normal button leads to reverse hangman (already implemented)
    - original button sets up following:
      - hangman starts with gallows
      - a body part is added upon an incorrect guess
      - after all body parts added the player loses
      - if the player gets all the letters before all
        body parts are added the player wins

# Gold Features
- add background music w/ mute button
  - make mute button for ALL audio
  - make mute button for bg music only
- add tutorial images
- add scoring system
- add animations
- random words
