# React chess starter

Advanced chess components integration in React projects.

Main components:

- chess context
- puzzles
- drills
- PGN viewer
- PGN editor
- play against bots

## Chess context

This React context has data about the initial FEN, initial turn, current FEN, chess history and user turn.
Can be combined with other contexts that need chess related data.

## Puzzles

Puzzles also have alternative solutions for the first side to move. Any other sideline is ignored.

## Drills

Drills are puzzles with optional hints. Drills have 3 modes: arrow, square, puzzle.

- arrow mode shows an arrow shape of the next correct move
- square mode shows a circle for the next correct piece
- puzzle mode does not show any hints

The mainline is extracted from PGN input data. Any other sideline is ignored.

## PGN viewer

TODO

## PGN editor

TODO

## Play against bots

TODO
