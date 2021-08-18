import Logo from './Logo';

const LogoHamburger = ({ handleClick }) => {
  return (
    <div className="w-full flex items-center px-1 bg-gray-800 md:w-auto flex-wrap">
      <Logo />
      <button
        onClick={handleClick}
        className="ml-auto p-2 hover:bg-gray-900 rounded md:hidden"
      >
        <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
        <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
        <div className="w-6 h-1 bg-gray-300 my-0.5"></div>
      </button>
    </div>
  );
};

export default LogoHamburger;
