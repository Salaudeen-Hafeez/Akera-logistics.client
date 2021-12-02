import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchPost from '../Fetchhooks/useFetchPost';

const usePackageForm = (validate) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { _username, _email, auth_token } = userData.user;
  const usehistory = new useHistory();
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const [values, setValues] = useState({
    name: '',
    location: '',
    destination: '',
    sender: '',
    reciever: '',
    frajile: '',
    username: _username,
  });
  const uri = `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'frajile') {
      if (e.target.checked) {
        setValues({
          ...values,
          [name]: 'package is frajile',
        });
      } else {
        setValues({
          ...values,
          [name]: 'package not frajile',
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value.trim(),
      });
    }
  };
  console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      setUrl(uri);
    } else {
      setUrl('');
    }
  };
  const { data, fetchError, isLoading } = useFetchPost(url, values, _username);
  if (data !== null) {
    localStorage.removeItem('selectedPackage');
    localStorage.setItem('selectedPackage', JSON.stringify(data));
    usehistory.push('/Userpage');
  }

  return {
    handleChange,
    handleSubmit,
    isLoading,
    fetchError,
    values,
    error,
  };
};

export default usePackageForm;
