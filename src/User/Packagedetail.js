import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchPut from '../Fetchhooks/useFetchPut';
import useFetchGet from '../Fetchhooks/useFetchGet';
import AppMap from '../Map';
import ChangeDestination from '../Postpackage/Changedestination';
import Navbar from '../Universal/Navbar';
import Button from './Button';
import DisplayPackage from './Packagepage';

const PackageDetail = () => {
  const [url, setUrl] = useState('');
  const [values, setValues] = useState({});
  const usehistory = new useHistory();
  const [packages, setPackages] = useState(
    JSON.parse(localStorage.getItem('selectedPackage'))
  );

  const [geoCode1Url, setGeoCode1Url] = useState(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${packages._location}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
  );
  const [geoCode2Url, setGeoCode2Url] = useState(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${packages._destination}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
  );

  let location = {};
  let destination = {};

  const { data, isLoading } = useFetchPut(url, values);
  const user =
    JSON.parse(localStorage.getItem('userData')) ||
    JSON.parse(localStorage.getItem('adminData'));
  const { _email, users_id } = user.data;

  const useruri = `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${users_id}/${user.data.auth_token}/packages/${packages.parcel_id}`;
  const adminuri = `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${users_id}/${user.data.admin_token}/packages/${packages.parcel_id}`;
  const geoCode1 = useFetchGet(geoCode1Url);
  const geoCode2 = useFetchGet(geoCode2Url);

  if (geoCode1.data !== null && geoCode2.data !== null) {
    if (geoCode1.data.status === 'OK' && geoCode2.data.status === 'OK') {
      location = geoCode1.data.results[0].geometry.location;
      destination = geoCode2.data.results[0].geometry.location;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value.trim(),
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      localStorage.setItem('selectedPackage', JSON.stringify(data));
      setPackages(data);
      setUrl('');
      setGeoCode1Url(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data._location}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
      );
      setGeoCode2Url(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${data._destination}&key=AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA`
      );
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ('admin_token' in user.data) {
      setUrl(adminuri);
    } else {
      setUrl(useruri);
    }
  };

  const handleOkayButton = (e) => {
    e.preventDefault();
    if ('admin_token' in user.data) {
      usehistory.go(-1);
    } else {
      usehistory.push('/userpage');
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center items-center w-full bg-gray-200">
        <div>
          <h2 className="text-center font-bold py-3">Package details</h2>
          <DisplayPackage />
          <Button handleOkayButton={handleOkayButton} />
          <AppMap location={location} destination={destination} />
          {isLoading && (
            <h2 className="font-bold mt-3 text-center">
              updating destination...
            </h2>
          )}
          <ChangeDestination
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            user={user.data}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
