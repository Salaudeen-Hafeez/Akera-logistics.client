import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useSignupForm from './useSignupForm';
import useFetchPost from '../Fetchhooks/useFetchPost';
import validateForm from '../Universal/ValidateForm';

const SignUp = () => {
  const [error, setError] = useState({});
  const [url, setUrl] = useState('');
  const usehistory = new useHistory();

  const { handleChange, values } = useSignupForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(values);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      if (values.email.includes('@sendit.com')) {
        setUrl(
          'https://sendit-logistic-2021.herokuapp.com/api/v1/users/admins'
        );
      } else {
        setUrl('https://sendit-logistic-2021.herokuapp.com/api/v1/users');
      }
    }
  };

  const data = useFetchPost(url, values);
  if (data.data !== null) {
    localStorage.clear();
    localStorage.setItem('userData', JSON.stringify(data));
    usehistory.push('/userpage');
  }
  useEffect(() => {
    if (data.fetchError !== null) {
      setError(data.fetchError);
    }
  }, [data]);

  return (
    <div className="flex items-center bg-gray-100 justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white rounded-md min-h-max w-4/5 shadow-2xl md:w-2/5"
      >
        <a href="home.html" className="px-1 inline-flex items-center">
          <img src="images/logo2.png" alt="Logo" className="w-10 h-9 mr-2" />
          <span className="text-lg font-bold uppercase tracking-wide">
            Akera Logistics
          </span>
        </a>
        <div
          className="flex flex-col items-left justify-center
         bg-gray-800 text-white px-10 text-sm h-4/5 rounded-md"
        >
          <div className="text-center">
            <h2 className="mb-6 text-lg font-bold">Sign-up Now</h2>
            <p className="mb-4">
              Please fill the form below to become a member and have access to
              our services
            </p>
          </div>
          <div className="">
            <div className="flex flex-col mb-4">
              <label className="pb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
                value={values.name}
                onChange={handleChange}
              />
              <small className="text-red-600 font-bold brightness-105">
                {error.name}
              </small>
            </div>
            <div className="flex flex-col mb-4">
              <label className="pb-1">Username</label>
              <input
                type="text"
                name="username"
                className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
                value={values.username}
                onChange={handleChange}
              />
              <small className="text-red-600 font-bold brightness-105">
                {error.username}
              </small>
            </div>
            <div className="flex flex-col mb-4">
              <label className="pb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
                value={values.email}
                onChange={handleChange}
              />
              <small className="text-red-600 font-bold brightness-105">
                {error.email}
              </small>
            </div>
            <div className="flex flex-col mb-6">
              <label className="pb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
                value={values.password}
                onChange={handleChange}
              />
              <small className="text-red-600 font-bold brightness-105">
                {error.password}
              </small>
            </div>
            <div className="flex flex-col mb-6">
              <label className="pb-1">Confirm Password</label>
              <input
                type="password"
                name="password2"
                className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
                value={values.password2}
                onChange={handleChange}
              />
              <small className="text-red-600 font-bold brightness-105">
                {error.password2}
              </small>
            </div>
          </div>
          <input
            type="submit"
            className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-900"
            id="submitBtn"
            value="Signup"
          />
          <p className="mb-6 text-center">
            Already a member?{' '}
            <Link
              to="/login"
              className="text-blue-400 underline hover:text-green-300"
            >
              Login
            </Link>
          </p>
        </div>
        <div>{values.name}</div>
      </form>
    </div>
  );
};

export default SignUp;
