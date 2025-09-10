import { contextMenuItems } from '@chess/constants/context-menu-items';
import { parseFen } from '@chess/functions';
import { Button } from '@components';
import { useContextMenu, useOnClickOutside } from '@hooks';
import { useEffect } from 'react';

const ContextMenu = ({ isVisible, position, onClose, moment, onAction, tree }) => {
  const { elementRef } = useContextMenu(isVisible, position);

  useOnClickOutside(elementRef, () => {
    if (isVisible) {
      onClose();
    }
  });

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  const handleAction = (actionId, moment) => {
    onAction(actionId, moment);
    onClose();
  };

  // Check if this is the first move in the tree
  const isFirstMove = () => {
    if (!tree || !moment || tree.length === 0) return false;
    const mainLine = tree[0];
    if (!mainLine || mainLine.length === 0) return false;

    const firstMoveInMainLine = mainLine.find((m) => m.move);
    return firstMoveInMainLine && firstMoveInMainLine.index === moment.index;
  };

  const getFilteredMenuItems = () => {
    if (isFirstMove()) {
      return contextMenuItems;
    } else {
      return contextMenuItems.filter((item) => item.id !== 'comment-before');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={elementRef}
      className="fixed z-50 bg-secondary border shadow-lg min-w-48"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {moment && (
        <div className="px-3 py-2 bg-primary border-b">
          <div className="text-center text-black font-semibold font-chess">
            {parseFen(moment.fen)?.fullmoveNumber || ''}. {moment.move}
          </div>
        </div>
      )}
      {getFilteredMenuItems().map((item) => (
        <Button
          key={item.id}
          className="w-full text-left px-3 py-2 text-sm text-tertiary hover:bg-accent hover:text-white flex items-center"
          onClick={() => handleAction(item.id, moment)}
        >
          <i className={`${item.icon} w-4 mr-3`}></i>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ContextMenu;
