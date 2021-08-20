import Logo from './Logo';
import { Link } from 'react-router-dom';

const LogoHamburger = ({ handleClick }) => {
  return (
    <div className="w-full flex items-center text-white justify-between px-1 bg-gray-800 md:w-auto flex-wrap">
      <Logo />
      <div>
        <Link to={'signup'} className="pr-2">
          sign-up
        </Link>
        <Link to={'login'}>login</Link>
        <button
          onClick={handleClick}
          className="p-2 hover:bg-gray-900 rounded md:hidden"
        >
          <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
          <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
          <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
        </button>
      </div>
    </div>
  );
};

export default LogoHamburger;
