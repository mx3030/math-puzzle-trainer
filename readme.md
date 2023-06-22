# database structure

This is just a try to see, how GeoGebra could be used in school to generate puzzle tasks in the style of puzzle rush from chess.com and lichess.
At the moment it is possible to generate two types of puzzles. 
1. You can try to generate random GeoGebra tasks, by writing a function. See ggbPuzzles.js for reference.
2. You can generate templates for random calculations. See calcPuzzles.js for reference.
To help visualizing the generated puzzles you can use puzzleGenerator.html with puzzleGenerator.js in background, to better control upload to database.

The database for the puzzles and multiplayer data is controlled with Firebase. At the moment, there are two types of uploads, that look the most promising.
But i am no expert. 
1. GeoGebra Puzzles are very heavy to generate at runtime, so i think it is better to just upload a bunch of them with puzzleGenerator.html. You can also set the number.
2. For calculation puzzles it should be no problem to generate them, when a player is creating the room. But you can also upload specific puzzles with puzzleGenerator.html.

All puzzles get a few tags, which help searching them up, depending, what the user chooses to train. For the moment i think it should work for class7 and duell mode with difficulty
easy,medium and hard. I need to correct some coding mistakes here.

There are three main nodes in the database.
1. games
    - connectedPlayers (to see if room is free and some other stuff)
    - waitingPlayers (for countdown in multiplayer)
    - rankingPlayers (for progress bar representation)
    - time
        - duration
        - startTime (used for sync timer with firebase build in function timestamp)
    - puzzleSet (contains links to puzzles in puzzles node)
    - pathToTemp (contains path to temp node in temps for calculation puzzles created at runtime -> gets deleted if new game is startet -> maybe better solution!)
    - ...

2. tags
    For normalization each node contains some tags. If user selctes his topics, those nodes get searched, and every node, that contains all tags the user wants gets selected.
    These keys match the keys in puzzles node, that contains the puzzles and calculation templated (or specific calculation puzzles)
    For example a tag key could have the values -> [geometry,triangle,height,measure,easy,medium]
    If the user marks checkboxes, that include those tags, this key is selected in code.

3. puzzles
    Every key from tags, you can also find here. Keys contain a lot of random GeoGebra puzzles, or some calculation templates.
    
4. temps
    If puzzle has 'template' as information, random puzzle is created and saved under key here.


