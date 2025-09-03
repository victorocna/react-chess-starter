import { Link } from '@components';
import { sitename } from '@site.config';

const Logo = () => {
  return (
    <Link href="/">
      <div className="logo mb-6 flex cursor-pointer items-start">
        <img src="/images/logo.png" className="w-28 h-28" alt={sitename} />
      </div>
    </Link>
  );
};

export default Logo;
