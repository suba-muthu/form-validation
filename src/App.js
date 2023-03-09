import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const initialValues = {
    userName: "",
    email: "",
    password: ""
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
    // setIsSubmit(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formError]);

  const validate = (values) => {
    const errors = {};
    const regex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.userName = "UserName is required!";
    } else if (!values.userName.match(/^[a-zA-Z]+$/)) {
      errors.userName = "only characters Required!"
    }
    if (!values.email) {
      errors.email = "Email is Required!"
    } else if (!regex.test(values.email)) {
      errors.email ="This is not a valid email format!";
    } 
    if (!values.password) {
      errors.password = "password is Required!"
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "password cannot exceed more than 10 characters!";
    }
    return errors;
  }

  return (
    <div className="container">
      {Object.keys(formError).length === 0 && isSubmit ? (
        <div className='signup'>Signed in Successfully!</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className='field'>
            <label>UserName</label>
            <input 
              type="text" 
              name="userName" 
              placeholder='UserName'
              value={formValues.userName}
              onChange={handleChange}
            />
          </div>
          <p>{formError.userName}</p>
          <div className='field'>
            <label>Email</label>
            <input 
              type="text" 
              name="email" 
              placeholder='Email'
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formError.email}</p>
          <div>
            <label>Password</label>
            <input 
              type="text" 
              name="password" 
              placeholder='Password'
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formError.password}</p>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
