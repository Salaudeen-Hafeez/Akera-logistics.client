import Navlinkcomponent from './Navlinkcomponent';
const NavLinks = () => {
  const linkItems = ['home', 'services', 'contact', 'signup', 'login'];
  return (
    <div className="flex flex-col h-72 bg-gray-700 w-auto rounded-br-full justify-between md:rounded-0 md:bg-gray-800 md:h-auto md:inline-flex md:flex-row md:ml-auto">
      {linkItems.map((data) => (
        <Navlinkcomponent key={data} linkItem={data} />
      ))}
      {/* <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} /> */}
    </div>
  );
};

export default NavLinks;
