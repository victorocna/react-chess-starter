import { momentAnnotations } from '@chess/constants/moment-annotations';
import { parseExistingAnnotations } from '@chess/functions';
import { Button } from '@components';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AnnotationGroup } from '.';

const AddAnnotationModal = ({ hide, isOpen, moment, onAddAnnotation }) => {
  const [selectedAnnotations, setSelectedAnnotations] = useState({
    moves: null,
    evaluation: null,
    symbols: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && moment) {
      const selected = parseExistingAnnotations(moment, momentAnnotations);
      setSelectedAnnotations(selected);
    } else if (!isOpen) {
      setSelectedAnnotations({ moves: null, evaluation: null, symbols: null });
    }
  }, [isOpen, moment]);

  const handleAnnotationSelect = (category, annotation) => {
    setSelectedAnnotations((prev) => {
      const currentAnnotation = prev[category];
      const isSame =
        (currentAnnotation?.suffix && currentAnnotation.suffix === annotation?.suffix) ||
        (currentAnnotation?.nag && currentAnnotation.nag === annotation?.nag);

      return {
        ...prev,
        [category]: isSame ? null : annotation,
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onAddAnnotation(selectedAnnotations);
      hide();
    } catch (error) {
      console.error('Error adding annotation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasSelection = Object.values(selectedAnnotations).some(Boolean);

  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered={true} size="lg">
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold">
            Add Annotation
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-x text-tertiary"></i>
        </Button>
      </Modal.Header>
      <Modal.Body id="annotation-modal" className="max-h-96 overflow-y-auto">
        <AnnotationGroup
          title="NAGs for moves"
          annotations={momentAnnotations.moves}
          selectedAnnotation={selectedAnnotations.moves}
          onSelect={(annotation) => handleAnnotationSelect('moves', annotation)}
        />
        <AnnotationGroup
          title="NAGs for evaluation"
          annotations={momentAnnotations.evaluation}
          selectedAnnotation={selectedAnnotations.evaluation}
          onSelect={(annotation) => handleAnnotationSelect('evaluation', annotation)}
        />
        <AnnotationGroup
          title="Other symbols"
          annotations={momentAnnotations.symbols}
          selectedAnnotation={selectedAnnotations.symbols}
          onSelect={(annotation) => handleAnnotationSelect('symbols', annotation)}
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-2">
        <Button
          className="button full primary font-semibold text-base"
          onClick={handleSubmit}
          disabled={isLoading || !hasSelection}
        >
          <i className="fas fa-tag mr-2"></i>
          Add Annotation
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAnnotationModal;
