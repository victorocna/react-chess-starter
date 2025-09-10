import { Button, Textarea } from '@components';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const AddCommentModal = ({
  hide,
  isOpen,
  moment,
  onAddComment,
  isCommentBefore = false,
  tree = null,
}) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isOpen && moment) {
      if (isCommentBefore && tree) {
        // Look for existing comment in the starting position of the main line
        const mainLine = tree[0];
        if (mainLine && mainLine.length > 0) {
          const startingPosition = mainLine.find((m) => !m.move && m.comment);
          setComment(startingPosition?.comment || '');
        } else {
          setComment('');
        }
      } else {
        setComment(moment.comment || '');
      }
    } else if (!isOpen) {
      setComment('');
    }
  }, [isOpen, moment, isCommentBefore, tree]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onAddComment(comment.trim());
      hide();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={hide} backdrop="static" keyboard={false} centered>
      <Modal.Header className="flex items-center w-full justify-between">
        <Modal.Title>
          <h3 className="font-heading first-letter:uppercase text-base font-semibold">
            {isCommentBefore ? 'Add Comment Before Move' : 'Add Comment'}
          </h3>
        </Modal.Title>
        <Button className="-mr-2 flex h-8 w-8 items-center justify-center p-2" onClick={hide}>
          <i className="fa-solid fa-x text-black"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
          className="w-full h-32 p-3 bg-white text-black rounded border border-gray-600 focus:border-accent focus:outline-none resize-none"
          disabled={isLoading}
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-2">
        <Button
          className="button full primary font-semibold text-base"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <i className="fas fa-save mr-2"></i>
          Save Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCommentModal;
