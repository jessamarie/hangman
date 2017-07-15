Detailed List of Features
=========================

The following is a list of features implemented (checked) and unimplemented (unchecked). They are ordered by priority (Highest=Bronze). Features may be moved up when they become more of a priority.

Bronze
------
- [x] **Basic Structure & Styling**
  - [x] **Welcome Screen**
    - [x] *Play Game* Button
    - [x] *Custom Word* text-box
  - [x] **Game Screen**
    - [x] Hangman
    - [x] Guess
    - [x] Letters
    - [x] *New Game* Button
- [x] **Behavior:**
  - [x] **Buttons:**
    - [x] Game starts when player clicks on *Play Game* (1)
    - [x] Return to Welcome Screen when player clicks on *New Game*
  - [x] **Input**
    - [x] Game starts when player enters a *Custom Word* **AND*
      - [x] player presses Enter Key
      - [x] OR (1)
  - [x] **Game Play**
    - [x] Letter becomes unclickable when the player clicks one **AND**:
      - [x] **Case 1:** A body part is cut/added upon an incorrect guess
      - [x] **Case 2:** The guesses rerender upon a correct guess
    - [x] The last move makes ALL letters unclickable
    - [x] Edge cases are covered:
      - [x] words with spaces
      - [x] words with repeat letters


Silver Features
---------------
- [ ] **Structure & Styling**
  - [x] **Welcome Screen**
    - [x] Add *Tutorial* button
    - [x] Add play *Original* game button
  - [x] **Game Screen**
  - [ ] Add tutorial page
- [ ] **Behavior:**
  - [x] **Buttons:**
    - [ ] *tutorial* button leads to tutorial pages
  - [x] **Input**
  - [x] **Game Play**
    - [x] Add Sound Effects For:
      - [x] wrong guess
      - [x] correct guess
      - [x] win
      - [x] lose
    - [x] Add original game version
      - [x] hangman starts with gallows and ends with full body
- [ ] Add Tests


Gold Features
-------------
- [ ] **Structure & Styling**
  - [ ] **Welcome Screen**
    - [ ] *Custom* or *Random* word 'option' group
    - [ ] *Game Type* option group
    - [ ] *bg mute/unmute* button
    - [ ] *sound effect mute/unmute* button
    - [x] *Get Random Word* Button
  - [x] **Game Screen**
  - [ ] **Tutorial Screen**
    - [ ] add images
  - [ ] mobile friendly viewport
- [ ] **Behavior:**
  - [ ] **Game Setup**
    - [ ] They can choose *Custom* or *Random*
      - [ ] input box displays if custom
    - [ ] They can choose the game type
      - [ ] currently *normal* or *original*
      - [ ] Lastly they click play game
  - [ ] ** audio **
    - [ ] bg music plays on welcome Screen
    - [ ] appropriate audio mutes/unmutes when player clicks button
  - [x] **Buttons:**
    - [x] Games starts with Random Word when player clicks *Get Random Word*

Refactoring Plans
-----------------
- Make hangman class abstract-like and easily extendable
- Break WindowView into more classes to organize and
  minimize code bloat


Features Under Consideration/Planning
-------------------------------------
    - Scoring System (Timer Based?)
      - Track scores across games (even if the page is reloaded)
    - Animations
    - Theme Based Games

Features to remove/removed
--------------------------
