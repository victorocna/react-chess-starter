import { useContextActions } from '@chess/hooks';
import { useState } from 'react';
import { ContextMenu, PgnEditorModals } from '.';
import { MoveModal, PgnTree } from '../PgnViewer';

const PgnEditor = ({ tree, variations, variationProps, current, onMoveClick, setTree }) => {
  const { handleContextAction, commentModal, annotationModal } = useContextActions(tree, setTree);

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
      {variations && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50
          backdrop-blur-sm flex items-center justify-center z-50"
        >
          <MoveModal variations={variations} {...variationProps} />
        </div>
      )}
      <ContextMenu
        isVisible={contextMenu.isVisible}
        position={contextMenu.position}
        moment={contextMenu.moment}
        onAction={handleAction}
        onClose={handleCloseContextMenu}
      />
      <PgnEditorModals commentModal={commentModal} annotationModal={annotationModal} />
    </>
  );
};

export default PgnEditor;
