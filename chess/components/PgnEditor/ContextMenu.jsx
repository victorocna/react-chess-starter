import { Button } from '@components';
import { useEffect, useRef } from 'react';
import { contextMenuItems } from '@chess/constants/context-menu-items';
import { useOnClickOutside } from '@hooks';

const ContextMenu = ({ isVisible, position, onClose, moment, onAction }) => {
  const getMoveNumber = (fen) => {
    if (!fen) return '';
    const parts = fen.split(' ');
    return parts[5] || '';
  };
  const menuRef = useRef();

  useOnClickOutside(menuRef, () => {
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

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-secondary border shadow-lg min-w-48"
      style={{ left: position.x, top: position.y }}
    >
      {moment && (
        <div className="px-3 py-2 bg-primary border-b">
          <div className="text-center text-black font-semibold">
            {getMoveNumber(moment.fen)}. {moment.move}
          </div>
        </div>
      )}
      {contextMenuItems.map((item) => (
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
