import { createPopper } from '@popperjs/core';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for positioning context menus using Popper.js
 */
const useContextMenu = (isVisible, position, options = {}) => {
  const elementRef = useRef();
  const [popperInstance, setPopperInstance] = useState(null);

  // Default Popper options with sensible defaults for context menus
  const defaultOptions = {
    placement: 'bottom-start',
    ...options,
  };

  // Create virtual element for Popper positioning
  useEffect(() => {
    if (isVisible && elementRef.current && position) {
      const virtualElement = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            top: position.y,
            right: position.x,
            bottom: position.y,
            left: position.x,
          };
        },
      };

      const popperInstanceRef = createPopper(virtualElement, elementRef.current, defaultOptions);

      setPopperInstance(popperInstanceRef);

      return () => {
        popperInstanceRef.destroy();
        setPopperInstance(null);
      };
    }
  }, [isVisible, position, JSON.stringify(defaultOptions)]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (popperInstance) {
        popperInstance.destroy();
      }
    };
  }, [popperInstance]);

  return {
    elementRef,
    popperInstance,
  };
};

export default useContextMenu;
