import { Button } from '@components';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';
import { MemorySlider, RangeSlider } from '.';
import {
  ENGINE_MAX_LINES,
  ENGINE_MEMORY_VALUES,
  ENGINE_STORAGE_KEYS,
} from '@chess/constants/engine';

const EngineSettings = ({ memory, numLines, onMemoryChange, onNumLinesChange }) => {
  const { hide, isOpen, toggle } = useDisclosure(false);
  const ref = useRef(null);

  useOnClickOutside(ref, hide);

  const handleNumLinesChange = (value) => {
    localStorage.setItem(ENGINE_STORAGE_KEYS.numLines, value.toString());
    onNumLinesChange(value);
  };

  const handleMemoryChange = (value) => {
    localStorage.setItem(ENGINE_STORAGE_KEYS.memory, value.toString());
    onMemoryChange(value);
  };

  return (
    <>
      <Button
        id="engine-settings-button"
        onClick={toggle}
        className="p-1 hover:bg-black/20 rounded transition-colors"
        aria-label="Engine Settings"
      >
        <i className="fas fa-cog text-gray-700"></i>
      </Button>
      {isOpen && (
        <div
          id="engine-settings-menu"
          ref={ref}
          className="absolute left-0 right-0 top-[40px] bg-gray-100 border-t border-gray-300 shadow-xl z-50 p-4"
        >
          <div className="space-y-4">
            <RangeSlider
              label="Multiple lines"
              value={numLines}
              max={ENGINE_MAX_LINES}
              unit={ENGINE_MAX_LINES}
              onChange={handleNumLinesChange}
            />
            <MemorySlider
              label="Memory"
              value={memory}
              values={ENGINE_MEMORY_VALUES}
              onChange={handleMemoryChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EngineSettings;
