# React chess starter

Advanced chess components integration in React projects.

## Packages (dependencies)

- `chess-moments`
- `next-chessground`

### `chess-moments`

This package has the core chess logic for PGN file management

- transform a PGN file into "chess moments"
- transform back "chess moments" into a PGN file
- add move in a PGN file
- promote mainline in a PGN file
- get next/prev move in a PGN file
- delete from/until move in a PGN file
- move trainer

### `next-chessground`

This package has the core chess board logic

- pawn promotion
- theme options for board and pieces
- undo and move functions useful in drills and puzzles

## Main components

- chess context
- puzzles
- drills
- PGN viewer
- PGN editor
- play against bots

### Chess context

This React context has data about the initial FEN, initial turn, current FEN, chess history and user turn.
Can be combined with other contexts that need chess related data.

### Puzzles

Puzzles also have alternative solutions for the first side to move. Any other sideline is ignored.

### Drills

Drills are puzzles with optional hints. Drills have 3 modes: arrow, square, puzzle.

- arrow mode shows an arrow shape of the next correct move
- square mode shows a circle for the next correct piece
- puzzle mode does not show any hints

The mainline is extracted from PGN input data. Any other sideline is ignored.

### PGN viewer

TODO

### PGN editor

Every move inside the PGN editor has a context menu which is revealed on right click with these options:

- Delete from here
- Delete until here
- Comment on this move
- Annotate with glyphs
- Promote variation
- Copy mainline PGN

### Play against bots

Play against computer opponents with adjustable difficulty levels. The feature integrates with the Stockfish chess engine to provide realistic gameplay experience.

Key features:
- 9 difficulty levels ranging from Beginner (800 ELO) to World Class (2400+ ELO)
- Real-time Stockfish engine integration with configurable skill levels
- Automatic game over detection (checkmate, stalemate, draw)
- Move history tracking and PGN notation display
