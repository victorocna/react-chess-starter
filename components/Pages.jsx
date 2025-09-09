import { MenuItem } from '@components';

const Pages = () => {
  return (
    <>
      <MenuItem href="/" level="1">
        Basic chess board
      </MenuItem>
      <MenuItem href="/puzzle" level="1">
        Chess puzzles
      </MenuItem>
      <MenuItem href="/drill" level="1">
        Chess drills
      </MenuItem>
      <MenuItem href="/play" level="1">
        Play computer
      </MenuItem>
      <MenuItem href="/pgn-viewer" level="1">
        PGN viewer
      </MenuItem>
      <MenuItem href="/pgn-editor" level="1">
        PGN editor
      </MenuItem>
      <MenuItem href="/move-trainer" level="1">
        Move trainer
      </MenuItem>
      <MenuItem href="/show-threat" level="1">
        Show threat
      </MenuItem>
    </>
  );
};

export default Pages;
