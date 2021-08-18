const validateForm = (values) => {
  let error = {};

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'frajile' && value === '') {
      return;
    }
    if (value === '') {
      error = { ...error, [key]: `${key} feild can not be blank` };
    } else if (key === 'password') {
      if (!value.length >= 6) {
        error = { ...error, [key]: 'password must be 6 or more character' };
      }
    } else if (key === 'password2') {
      if (!value.length >= 6) {
        error = { ...error, [key]: 'password must be 6 or more character' };
      } else if (value !== values.password) {
        error = { ...error, [key]: 'password does not match' };
      }
    } else if (key === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value)) {
        error = { ...error, [key]: 'the emeil entered is not valid' };
      }
    } else if (key === 'sender' || key === 'reciever') {
      if (
        !value.match(
          /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im
        )
      ) {
        error = { ...error, [key]: 'phone number not valid' };
      }
    }
  });
  return error;
};

export default validateForm;
