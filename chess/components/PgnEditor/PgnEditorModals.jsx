import { AddAnnotationModal, AddCommentModal } from '.';

const PgnEditorModals = ({ commentModal, annotationModal }) => {
  return (
    <>
      <AddCommentModal
        isOpen={commentModal.isOpen}
        hide={commentModal.hide}
        moment={commentModal.moment}
        onAddComment={commentModal.handleSubmit}
      />
      <AddAnnotationModal
        isOpen={annotationModal.isOpen}
        hide={annotationModal.hide}
        moment={annotationModal.moment}
        onAddAnnotation={annotationModal.handleSubmit}
      />
    </>
  );
};

export default PgnEditorModals;
