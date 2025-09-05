import { useEffect, useRef } from 'react';

const useEqualHeight = () => {
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const lastHeight = useRef(0);

  useEffect(() => {
    if (sourceRef.current && targetRef.current) {
      const updateHeight = () => {
        try {
          const height = sourceRef.current.offsetHeight;
          targetRef.current.style.height = `${height}px`;
        } catch {
          return;
        }
      };

      // Initial height setting
      updateHeight();

      // Setup ResizeObserver to watch for size changes
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newHeight = entry.contentRect.height;
          if (newHeight !== lastHeight.current) {
            lastHeight.current = newHeight;
            updateHeight();
          }
        }
      });

      resizeObserver.observe(sourceRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [sourceRef, targetRef]);

  return { sourceRef, targetRef };
};

export default useEqualHeight;
