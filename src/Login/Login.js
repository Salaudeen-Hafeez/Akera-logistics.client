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

  const userUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
  const adminUrl =
    'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';

  const { data, fetchError, isLoading } = useFetchPost(url, values);
  useEffect(() => {
    setError(fetchError);
    setUrl('');
  }, [fetchError]);
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

  if (data !== null && Object.keys(error).length === 0) {
    localStorage.clear();
    if (values.email.includes('@sendit')) {
      localStorage.setItem('adminData', JSON.stringify(data));
      setTimeout(usehistory.push('/adminpage'), 1200);
    } else {
      localStorage.setItem('userData', JSON.stringify(data));
      setTimeout(usehistory.push('/userpage'), 1200);
    }
  }

  return (
    <div className="flex items-center bg-gray-100 justify-center w-full h-screen">
      <LoginPage
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        values={values}
      />
    </div>
  );
};

export default Login;
