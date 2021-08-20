import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchGet from '../Fetchhooks/useFetchGet';
import UserPackages from './Userpackages';

import { useHistory } from 'react-router-dom';

const UserPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [url, setUrl] = useState('');
  const [token, setToken] = useState(true);
  const [updatePackage, setUpdatePackage] = useState(false);
  const [packageData, setPackageData] = useState({});
  const usehistory = new useHistory();
  const packageUrl = `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${userData.data._username}/${userData.data.users_id}/${userData.data._email}/${userData.data.auth_token}/packages`;

  const { data, fetchError, isLoading } = useFetchGet(url);
  if (data !== null && updatePackage) {
    setPackageData(data);
    setUpdatePackage(false);
  }
  const handleClick = () => {
    setUrl(packageUrl);
    setUpdatePackage(true);
  };

  const handlePackage = (e) => {
    const packageId = parseInt(e.target.attributes.id.textContent);
    const selectedPackage = data.filter((data) => data.parcel_id === packageId);
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage[0]));
    usehistory.push('/packagepage');
  };

  const handleAddPackage = () => {
    if (!('auth_token' in userData.data)) {
      setToken(false);
    } else {
      setToken(true);
      usehistory.push('/addpackage');
    }
  };
  return (
    <div className="text-gray-900">
      {userData && (
        <div className="flex items-center flex-col ">
          <div
            className="flex flex-col bg-userbg bg-transparent w-full 
          items-center py-6 shadow-2xl"
          >
            <img
              src="/images/Lagos4.jpg"
              alt="profilepicture"
              className="w-2/5 h-24 rounded-lg mb-4"
            />
            <div className="text-center">
              <h1 className="text-lg font-bold">{userData.data._name}</h1>
              <ul>
                <li id="username">{userData.data._username}</li>
                <li>{userData.data._email}</li>
                <li className="text-blue-600 font-bold">
                  {userData.data._status}
                </li>
                <li
                  className="mt-4 
              text-sm rounded-lg 
              cursor-pointer hover:underline 
              hover:bg-gray-600"
                >
                  <button onClick={handleClick}>My packages</button>
                </li>
                <li
                  className="mt-4 
              text-sm rounded-lg 
              cursor-pointer 
              hover:bg-btnbg"
                >
                  <Link to={''}>Pending packages</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {isLoading && (
              <h2 className="text-gray-900 font-bold mt-3">Loading...</h2>
            )}
            {fetchError !== null && token && (
              <h2 className="mt-3 font-bold text-red-500">
                {fetchError.packages} {fetchError.auth_token}
              </h2>
            )}
            {!token && (
              <h2 className="mt-3 font-bold text-red-500">
                Kindly
                <Link to={'/login'} className="text-blue-500 underline">
                  Login
                </Link>
                to make orders
              </h2>
            )}
            {Object.keys(packageData).length !== 0 && (
              <div className="md:flex md:flex-col md:justify-center md:items-center md:w-full bg-mainbg">
                <h2 className="text-center text-gray-800 text-lg font-bold pt-4">
                  My packages
                </h2>
                <div className="md:grid md:grid-cols-2 md:grid-flow-rows md:gap-3 md:w-4/5 md:col-start-2 list-none">
                  {packageData.map((data) => (
                    <UserPackages
                      key={data.parcel_id}
                      packages={data}
                      handlePackage={handlePackage}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleAddPackage}
            className="my-4 py-1 bg-btnbg w-11/12 
            rounded-lg text-center"
          >
            Add new package
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
