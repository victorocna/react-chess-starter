import { classnames } from '@lib';
import Markdown from 'markdown-to-jsx';

const Comment = ({ comment, extraClass, inline = false }) => {
  const normalizedComment = comment
    .replace(/<br\s*\/?>/gi, '\n')
    .replaceAll('\\n', '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (inline) {
    const formattedComment = normalizedComment
      .replace(/^[-*+]\s+/gm, '`-` ')
      .replace(/([^\s])\n(?!\n)/g, '$1  \n');
    return (
      <span id="pgn-comment" className={classnames('comment max-w-none', extraClass)}>
        {' '}
        <Markdown options={{ forceInline: true, wrapper: 'span' }}>{formattedComment}</Markdown>
      </span>
    );
  }

  return (
    <div
      id="pgn-comment"
      className={classnames(
        'comment max-w-none text-wrap break-words whitespace-pre-line',
        extraClass
      )}
    >
      {normalizedComment}
    </div>
  );
};

export default Comment;
