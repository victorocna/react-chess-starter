import { copyMainlinePgn, deleteFrom, deleteUntil } from '@chess/functions';
import useDisclosure from '@hooks/use-disclosure';
import { tree as chessTree, momentsToPgn, promoteMainline } from 'chess-moments';
import { flatten } from 'lodash';
import { useState } from 'react';

const useContextActions = (tree, setTree) => {
  const commentModal = useDisclosure();
  const [commentMoment, setCommentMoment] = useState(null);

  const annotationModal = useDisclosure();
  const [annotationMoment, setAnnotationMoment] = useState(null);

  const handleContextAction = (action, moment) => {
    if (!moment || !tree) return;

    switch (action) {
      case 'delete-from': {
        const updatedTree = deleteFrom(tree, moment);
        setTree(updatedTree);
        break;
      }

      case 'delete-until': {
        const updatedTree = deleteUntil(tree, moment);
        setTree(updatedTree);
        break;
      }

      case 'copy': {
        const moments = flatten(tree);
        const mainlinePgn = copyMainlinePgn(moments);
        navigator.clipboard
          .writeText(mainlinePgn)
          .then(() => {})
          .catch((err) => {
            console.error('Failed to copy PGN to clipboard:', err);
          });
        break;
      }

      case 'promote': {
        const moments = flatten(tree);
        const promotedMoments = promoteMainline(moments, moment);

        // Convert back to PGN and then to proper tree structure
        const pgn = momentsToPgn(promotedMoments);
        const updatedTree = chessTree(pgn);
        setTree(updatedTree);
        break;
      }

      case 'comment': {
        setCommentMoment(moment);
        commentModal.show();
        break;
      }

      case 'annotate': {
        setAnnotationMoment(moment);
        annotationModal.show();
        break;
      }

      default:
        break;
    }
  };

  const handleAddComment = (comment) => {
    if (!commentMoment || !comment.trim()) return;

    // Use chess-moments approach - flatten, modify, convert back to tree
    const moments = flatten(tree);
    const updatedMoments = moments.map(moment =>
      moment.index === commentMoment.index
        ? { ...moment, comment: comment.trim() }
        : moment
    );

    const pgn = momentsToPgn(updatedMoments);
    const updatedTree = chessTree(pgn);
    setTree(updatedTree);

    commentModal.hide();
    setCommentMoment(null);
  };

  const hideCommentModal = () => {
    commentModal.hide();
    setCommentMoment(null);
  };

  const handleAddAnnotation = (annotations) => {
    if (!annotationMoment || !annotations) return;

    // Create suffix from annotations (same logic as original function)
    const suffix = [
      annotations.moves?.suffix,
      annotations.evaluation?.suffix,
      annotations.symbols?.suffix,
    ]
      .filter(Boolean)
      .join('');

    // Use chess-moments approach - flatten, modify, convert back to tree
    const moments = flatten(tree);
    const updatedMoments = moments.map(moment =>
      moment.index === annotationMoment.index
        ? { ...moment, suffix: suffix || undefined }
        : moment
    );

    const pgn = momentsToPgn(updatedMoments);
    const updatedTree = chessTree(pgn);
    setTree(updatedTree);

    annotationModal.hide();
    setAnnotationMoment(null);
  };

  const hideAnnotationModal = () => {
    annotationModal.hide();
    setAnnotationMoment(null);
  };

  return {
    handleContextAction,
    commentModal: {
      isOpen: commentModal.isOpen,
      hide: hideCommentModal,
      moment: commentMoment,
      handleAddComment,
    },
    annotationModal: {
      isOpen: annotationModal.isOpen,
      hide: hideAnnotationModal,
      moment: annotationMoment,
      handleAddAnnotation,
    },
  };
};

export default useContextActions;
