import { Button } from '@components';
import { classnames } from '@lib';

const ThreatButton = ({ isThreatActive, onToggleThreat }) => {
  return (
    <Button
      className={classnames(
        'text-white px-2.5 py-1 lg:px-4 lg:py-2 -my-1 rounded',
        isThreatActive ? 'bg-secondary text-tertiary' : 'bg-accent'
      )}
      onClick={onToggleThreat}
    >
      <span className="text-xs lg:text-sm font-semibold mr-2">Threat</span>
      <i className="fa-solid fa-bullseye"></i>
    </Button>
  );
};

export default ThreatButton;
