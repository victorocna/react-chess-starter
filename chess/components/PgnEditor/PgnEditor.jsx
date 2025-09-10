import { useContextActions } from '@chess/hooks';
import { useState } from 'react';
import { ContextMenu, PgnEditorModals } from '.';
import { PgnTree } from '../PgnViewer';

const PgnEditor = ({ tree, current, onMoveClick, setTree }) => {
  const { handleContextAction, commentModal, commentBeforeModal, annotationModal } =
    useContextActions(tree, setTree);

  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    moment: null,
  });

  const handleRightClick = (event, moment) => {
    event.preventDefault();
    onMoveClick(moment);
    setContextMenu({
      isVisible: true,
      position: { x: event.pageX, y: event.pageY },
      moment,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, isVisible: false }));
  };

  const handleAction = (actionId, moment) => {
    handleContextAction(actionId, moment);
  };

  return (
    <>
      <PgnTree
        tree={tree}
        current={current}
        onMoveClick={onMoveClick}
        onRightClick={handleRightClick}
      />
      <ContextMenu
        isVisible={contextMenu.isVisible}
        position={contextMenu.position}
        moment={contextMenu.moment}
        onAction={handleAction}
        onClose={handleCloseContextMenu}
        tree={tree}
      />
      <PgnEditorModals
        commentModal={commentModal}
        commentBeforeModal={commentBeforeModal}
        annotationModal={annotationModal}
        tree={tree}
      />
    </>
  );
};

export default PgnEditor;
