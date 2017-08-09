# Project 1 Evaluation

## Deployment:
**3: Excelling**
> Did you successfully deploy your project to github pages? Is the app's functionality the same deployed as it is locally?

## Technical Requirements:
**3: Excelling**
> Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?

## Code Quality:
**3: Excelling**
> Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code?

## Creativity/Interface:
**3: Excelling**
> Is your user interface easy to use and understand? Does it make sense for the problem you're solving? Does your interface demonstrate creative design?


## Notes

Great job on this project! It was quite a unique presentation of Hangman.

Interesting choice to use canvas for drawing your hangman view. Most students tend to use transformed `div`s or a sequence of static images, so it was refreshing to see this approach.

Nice modularity between the different views and your model. Lots of global variables and declarative functions.

A few critiques:

While HangmanModel.js and WindowView.js were well commented, HangmanView.js had very minimal commenting.

The layout wasn't particularly responsive. I've made some edits to your html and css files to propose a different approach.


# Things you'd like specific feedback on:
- Model-VIew set up. Is there anything that I can move to the model? Could I have created another class to minimize code bloat?


I think your HangmanView and is about as concise as it could be given the amount of work for canvas drawing there, and WindowView doesn't try to do any model work either and sticks to view management. It is a bit confusing to see some method names repeated between HangmanView and WindowView (like `setReverseMode()`), but there's not much to be done about that since the name is appropriate in both contexts. In one it's the click handler calling many related methods, and in the model context it's performing the data manipulation.


- Handling of event listeners in the view. Can I make this more DRY somehow? Instead of having so many functions for different versions of the game


I want to be able to recommend a clever suggestion here, but again your code is already rather DRY and modular as it is. Calling model API/functions from your view when clicks occur is a fine option for interaction. The typical alternative would be to handle the clicks from within your model which would make it *more* coupled to the view, not less. The only real alternative option I see would be to implement your own [custom events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) and listeners in the model. These would be for conditions like "letter has been guessed" or "reset game" and have those events triggered from the view without having to directly call the model's methods. This, however would probably add more overhead than is really needed.