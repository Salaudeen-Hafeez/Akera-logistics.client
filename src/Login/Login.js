import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchPost from '../Fetchhooks/useFetchPost';
import LoginPage from './Loginpage';
import useLoginForm from './useLoginForm';
import validateForm from '../Universal/ValidateForm';

const Login = () => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const { handleChange, values } = useLoginForm();
  const usehistory = new useHistory();

  const userUrl =
    'https://sendit-logistic-2021.herokuapp.com/api/v1/users/login';
  const adminUrl =
    'https://sendit-logistic-2021.herokuapp.com/api/v1/users/admins/login';

  const data = useFetchPost(url, values);
  useEffect(() => {
    if (data.fetchError !== null) {
      setError(data.fetchError);
      setUrl('');
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setUrl('');
    const errors = validateForm(values);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      if (!values.email.includes('@sendit.com')) {
        setUrl(userUrl);
      } else {
        setUrl(adminUrl);
      }
    }
  };

  if (data.data !== null && Object.keys(error).length === 0) {
    localStorage.clear();
    if (values.email.includes('@sendit')) {
      localStorage.setItem('adminData', JSON.stringify(data));
      usehistory.push('/adminpage');
    } else {
      localStorage.setItem('userData', JSON.stringify(data));
      usehistory.push('/userpage');
    }
  }

  return (
    <div className="flex items-center bg-gray-100 justify-center w-full h-screen">
      {data.isLoading && <h2>Loading...</h2>}
      {!data.isLoading && (
        <LoginPage
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          values={values}
        />
      )}
    </div>
  );
};

export default Login;
