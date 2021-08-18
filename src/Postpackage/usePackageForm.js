import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchPost from '../Fetchhooks/useFetchPost';

const usePackageForm = (validate) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const usehistory = new useHistory();
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const [values, setValues] = useState({
    username: '',
    name: '',
    location: '',
    destination: '',
    sender: '',
    reciever: '',
    frajile: '',
  });

  const uri = `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${userData.data._username}/${userData.data._email}/${userData.data.auth_token}/packages`;

  // useEffect(() => {}, [data1]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    setError(errors);
    if (Object.keys(error).length === 0) {
      setUrl(uri);
    } else {
      setUrl('');
    }
  };
  const { data, fetchError, isLoading } = useFetchPost(url, values);
  console.log(data);
  if (data !== null) {
    localStorage.removeItem('selectedPackage');
    localStorage.setItem('selectedPackage', JSON.stringify(data));
    usehistory.push('/packagepage');
  }

  return { handleChange, handleSubmit, values, error, isLoading, fetchError };
};

export default usePackageForm;
