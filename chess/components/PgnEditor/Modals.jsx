import { AddAnnotationModal, AddCommentModal } from '.';

const Modals = ({ commentModal, annotationModal }) => {
  return (
    <>
      <AddCommentModal
        isOpen={commentModal.isOpen}
        hide={commentModal.hide}
        moment={commentModal.moment}
        onAddComment={commentModal.handleAddComment}
      />
      <AddAnnotationModal
        isOpen={annotationModal.isOpen}
        hide={annotationModal.hide}
        moment={annotationModal.moment}
        onAddAnnotation={annotationModal.handleAddAnnotation}
      />
    </>
  );
};

export default Modals;
