import { useState } from 'react';
import { ContextMenu, Modals, PgnTreeEditor } from '.';
import useContextActions from '@chess/hooks/use-context-actions';

const Editor = ({ tree, current, onMoveClick, setTree }) => {
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
      <PgnTreeEditor
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
      />
      <Modals commentModal={commentModal} annotationModal={annotationModal} />
    </>
  );
};

export default Editor;
