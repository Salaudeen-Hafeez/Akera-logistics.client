import { useState } from 'react';

const AdminComponent = ({ data, adminEvents }) => {
  const [showPackage, setShowPackage] = useState(false);
  const {
    handleUser,
    handleNewPackage,
    handlePackageInTransit,
    handleDeliveredPackage,
  } = adminEvents;

  const handlePackage = () => {
    setShowPackage(!showPackage);
  };
  return (
    <div>
      <div
        className="flex flex-col bg-userbg bg-transparent w-full 
          items-center py-6 shadow-lg"
      >
        <img
          src="/images/Lagos4.jpg"
          alt="profilepicture"
          className="w-2/5 h-24 rounded-lg mb-4"
        />
        <div className="text-center">
          <h1 className="text-lg font-bold">{data._name}</h1>
          <ul>
            <li>{data._username}</li>
            <li>{data._email}</li>
            <li className="text-green-500">{data._status}</li>
          </ul>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-start text-blue-500 mt-2">
          <button className="ml-2" onClick={handleUser}>
            Users
          </button>
          <button className="ml-2" onClick={handlePackage}>
            Packages
          </button>
        </div>
        {showPackage && (
          <div className="mt-2 ml-2 flex flex-col">
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white"
              onClick={handleNewPackage}
            >
              New packages
            </button>
            <div className=""></div>
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white"
              onClick={handlePackageInTransit}
            >
              Packages in transit
            </button>
            <button
              className="py-3 mb-2 bg-btnbg mx-2 rounded-lg hover:bg-purple-500 hover:text-white"
              onClick={handleDeliveredPackage}
            >
              Delivered packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComponent;
