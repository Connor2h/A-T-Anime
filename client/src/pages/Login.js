import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER, {
    refetchQueries: [
      QUERY_ME,
      'Me'
    ]
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    console.log("submitting form");
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className='col s12 m12 l6 '>
        <div className="card bkg-color2">
          <h4 className="card-header">Log In</h4>
          <div className="card-body login-signup">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input bkg-input form-input-cause-i-said-so"
                placeholder="Email"
                name="email"
                type="email"
                id="login-email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input bkg-input form-input-cause-i-said-so"
                placeholder="Password"
                name="password"
                type="password"
                id="login-password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn waves-effect waves-light" type="submit">
                Log In <i className="material-icons right">send</i>
              </button>
            </form>
            <p className='pLogin-Signup'>
              Trouble logging in? Make sure browser cookies and JavaScript are enabled.
            </p>

            {error && <div>Login failed</div>}
          </div>
        </div>
    </div>
  );
};

export default Login;
