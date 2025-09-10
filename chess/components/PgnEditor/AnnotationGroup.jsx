import { Button } from '@components';
import { classnames } from '@lib';

const AnnotationGroup = ({ title, annotations, selectedAnnotation, onSelect }) => {
  return (
    <div id="annotation-group" className="mb-4">
      <h4 className="text-sm font-semibold text-tertiary mb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {annotations.map((annotation) => (
          <Button
            key={annotation.suffix}
            className={classnames(
              'flex items-center p-2 rounded border text-left transition-colors',
              selectedAnnotation?.suffix === annotation.suffix
                ? 'bg-accent border-accent text-white'
                : 'bg-white border-gray-300 text-tertiary hover:border-gray-400 hover:bg-gray-50'
            )}
            onClick={() => onSelect(annotation)}
          >
            <span className="font-mono text-lg mr-2 min-w-[2rem]">{annotation.suffix}</span>
            <span className="text-sm">{annotation.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnnotationGroup;
