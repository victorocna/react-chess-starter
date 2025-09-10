import { AddAnnotationModal, AddCommentModal } from '.';

const PgnEditorModals = ({ commentModal, commentBeforeModal, annotationModal, tree }) => {
  return (
    <>
      <AddCommentModal
        isOpen={commentModal.isOpen}
        hide={commentModal.hide}
        moment={commentModal.moment}
        onAddComment={commentModal.handleSubmit}
        isCommentBefore={false}
      />
      <AddCommentModal
        isOpen={commentBeforeModal.isOpen}
        hide={commentBeforeModal.hide}
        moment={commentBeforeModal.moment}
        onAddComment={commentBeforeModal.handleSubmit}
        isCommentBefore={true}
        tree={tree}
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
