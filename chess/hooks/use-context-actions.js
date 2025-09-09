import {
  addAnnotation,
  addComment,
  copyMainlinePgn,
  deleteFrom,
  deleteUntil,
} from '@chess/functions';
import { promoteMainlineTree } from 'chess-moments';
import { flatten } from 'lodash';
import { useState } from 'react';

const useContextActions = (tree, setTree) => {
  const [commentModal, setCommentModal] = useState({ isOpen: false, moment: null });
  const [annotationModal, setAnnotationModal] = useState({ isOpen: false, moment: null });

  const handleContextAction = (action, moment) => {
    if (!moment || !tree) {
      return;
    }

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
        navigator.clipboard.writeText(mainlinePgn);
        break;
      }

      case 'promote': {
        const updatedTree = promoteMainlineTree(tree, moment);
        setTree(updatedTree);
        break;
      }

      case 'comment': {
        setCommentModal({ isOpen: true, moment });
        break;
      }

      case 'annotate': {
        setAnnotationModal({ isOpen: true, moment });
        break;
      }

      default:
        break;
    }
  };

  const handleAddComment = (comment) => {
    if (!commentModal.moment || !comment?.trim()) {
      return;
    }

    const updatedTree = addComment(tree, commentModal.moment, comment);
    setTree(updatedTree);
    setCommentModal({ isOpen: false, moment: null });
  };

  const handleAddAnnotation = (annotations) => {
    if (!annotationModal.moment || !annotations) {
      return;
    }

    const updatedTree = addAnnotation(tree, annotationModal.moment, annotations);
    setTree(updatedTree);
    setAnnotationModal({ isOpen: false, moment: null });
  };

  return {
    handleContextAction,
    commentModal: {
      isOpen: commentModal.isOpen,
      moment: commentModal.moment,
      hide: () => setCommentModal({ isOpen: false, moment: null }),
      handleSubmit: handleAddComment,
    },
    annotationModal: {
      isOpen: annotationModal.isOpen,
      moment: annotationModal.moment,
      hide: () => setAnnotationModal({ isOpen: false, moment: null }),
      handleSubmit: handleAddAnnotation,
    },
  };
};

export default useContextActions;
