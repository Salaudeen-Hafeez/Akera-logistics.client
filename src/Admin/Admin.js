import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchDelete from '../Fetchhooks/useFetchDelete';
import useFetchGet from '../Fetchhooks/useFetchGet';
import AdminComponent from './Admincomponent';

const Admin = () => {
  const [url, setUrl] = useState('');
  const [deleteurl, setDeleteUrl] = useState('');
  const [usersDataReady, setUsersDataReady] = useState(false);
  const [packageDataReady, setpackageDataReady] = useState(false);
  const [toggleUsers, setToggleUsers] = useState(false);
  const [togglePackages, setTogglePackages] = useState(false);
  const usehistory = new useHistory();

  const { data } = useFetchGet(url);
  useFetchDelete(deleteurl);

  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const users = JSON.parse(localStorage.getItem('users'));
  const packages = JSON.parse(localStorage.getItem('usersPackage'));

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      if ('users_id' in data[0]) {
        localStorage.setItem('users', JSON.stringify(data));
        setpackageDataReady(false);
        setUsersDataReady(true);
      } else if ('parcel_id' in data[0]) {
        localStorage.setItem('usersPackage', JSON.stringify(data));
        setUsersDataReady(false);
        setpackageDataReady(true);
      }
    }
  }, [data]);

  const handleUser = () => {
    setUrl(
      `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${adminData.data._email}/${adminData.data.admin_token}`
    );
    setToggleUsers(!toggleUsers);
    setpackageDataReady(false);
  };

  const handleNewPackage = () => {
    const condition = 'At the location';
    setUrl(
      `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${adminData.data._email}/${adminData.data.admin_token}/packages/${condition}`
    );
    setTogglePackages(!togglePackages);
    setUsersDataReady(false);
  };

  const handlePackageInTransit = () => {
    const condition = 'In transit';
    setUrl(
      `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${adminData.data._email}/${adminData.data.admin_token}/packages/${condition}`
    );
    setTogglePackages(!togglePackages);
    setUsersDataReady(false);
  };

  const handleDeliveredPackage = () => {
    const condition = 'Delivered';
    setUrl(
      `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${adminData.data._email}/${adminData.data.admin_token}/packages/${condition}`
    );
    setTogglePackages(!togglePackages);
    setUsersDataReady(false);
  };

  const handleSelectedPackage = (e) => {
    const packageId = parseInt(e.target.parentElement.id);
    const selectedPackage = packages.filter(
      (data) => data.parcel_id === packageId
    );
    localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage[0]));
    usehistory.push('/packagepage');
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const username = e.target.parentElement.children[1].innerText;

    setDeleteUrl(
      `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${username}/packages/${id}`
    );
  };

  const adminEvents = {
    handleUser,
    handleNewPackage,
    handlePackageInTransit,
    handleDeliveredPackage,
  };

  return (
    <div className="bg-userbg bg-opacity-15">
      <AdminComponent data={adminData.data} adminEvents={adminEvents} />
      <div>
        {usersDataReady && (
          <div>
            {users.map((user) => {
              return (
                <div
                  key={user.users_id}
                  className="mt-3 bg-white p-3 rounded-lg 
                  cursor-pointer shadow-inner backdrop-filter 
                  backdrop-sepia hover:shadow-md"
                >
                  <h2 className="font-bold ">{user._name}</h2>
                  <p>{user._email}</p>
                  <p>{user._username}</p>
                  <p className="text-green-600 font-bold">{user._status}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {packageDataReady && (
          <div>
            {packages.map((packag) => {
              return (
                <div
                  key={packag.parcel_id}
                  id={packag.parcel_id}
                  className="mt-3 bg-white p-3 rounded-lg 
                  cursor-pointer shadow-inner backdrop-filter 
                  backdrop-sepia hover:shadow-md"
                >
                  <h2 className="font-bold ">{packag._name}</h2>
                  <p>{packag._username}</p>
                  <p>{packag._location}</p>
                  <p
                    className="text-green-600 font-bold"
                    onClick={handleSelectedPackage}
                  >
                    {packag._status}
                  </p>
                  <button
                    className="w-full text-right pr-3 text-red-400"
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
