import { useState, useEffect } from 'react';
import useFetchGet from '../Fetchhooks/useFetchGet';
import UserPackages from './Userpackages';

import { useHistory } from 'react-router-dom';

const UserPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { _username, users_id, _email, auth_token } = userData.user;
  const [url, setUrl] = useState('');
  const [token, setToken] = useState(true);
  const [packageData, setPackageData] = useState({});
  const usehistory = new useHistory();
  const packageUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${users_id}/${_email}/${auth_token}/packages`;
  const pendingPackageUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${_username}/${auth_token}/packages/${'In transit'}`;

  const { data, fetchError, isLoading } = useFetchGet(url);
  useEffect(() => {
    if (data !== null) {
      setPackageData(data);
    }
  }, [data]);

  const handleClick = () => {
    if (!('auth_token' in userData.user)) {
      setToken(false);
      usehistory.push('/login');
    } else {
      setToken(true);
      setUrl(packageUrl);
    }
  };
  const handlePendingPackage = () => {
    if (!('auth_token' in userData.user)) {
      usehistory.push('/login');
    } else {
      setUrl(pendingPackageUrl);
    }
  };
  const handlePackage = (e) => {
    const packageId = parseInt(e.target.attributes.id.textContent);
    const selectedPackage = data.filter((data) => data.parcel_id === packageId);
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage[0]));
    usehistory.push('/packagepage');
  };

  const handleAddPackage = () => {
    if (!('auth_token' in userData.user)) {
      usehistory.push('/login');
    } else {
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
              <h1 className="text-lg font-bold">{userData.user._name}</h1>
              <ul>
                <li id="username">{userData.user._username}</li>
                <li>{userData.user._email}</li>
                <li className="text-blue-600 font-bold">
                  {userData.user._status}
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
                  <button onClick={handlePendingPackage}>
                    Pending packages
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {isLoading && (
              <h2 className="text-gray-900 font-bold mt-3">Loading...</h2>
            )}
            {token && fetchError !== null && (
              <h2 className="mt-3 font-bold text-red-500">
                {fetchError.errMessage}
              </h2>
            )}
            {Object.keys(fetchError).length === 0 &&
              Object.keys(packageData).length !== 0 && (
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
