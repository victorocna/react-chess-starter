import { Button } from '@components';
import { useRef } from 'react';
import { local } from 'store2';

const PgnFileLoader = ({ onPgnLoad }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.pgn')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pgnText = e.target.result;
        local.set('pgn', pgnText);
        onPgnLoad(pgnText);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        onClick={handleFileSelect}
        id="load-pgn-button"
        className="bg-accent hover:bg-accent/90 text-white px-2.5 py-1 lg:px-4 lg:py-2 -my-1 rounded"
      >
        <span className="hidden lg:inline text-sm font-medium">Load PGN</span>
        <span className="inline lg:hidden">
          <i className="fas fa-upload"></i>
        </span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pgn"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default PgnFileLoader;
