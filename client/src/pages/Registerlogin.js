import React, { useState } from 'react';
import './Registerlogin.css';
import { useSpring } from 'react-spring';
import Login from './Login';
import Signup from './Signup';

const Registersignup = () => {
	const [registrationFormStatus] = useState(false);
	const loginProps = useSpring({
		left: registrationFormStatus ? -500 : 0, // Login form sliding positions
	});
	const registerProps = useSpring({
		left: registrationFormStatus ? 0 : 500, // Register form sliding positions
	});

	return (
		<div className='row card-panel bkg-input'>

			<section className='col s12 m12 l6'>
				<header className=''>
					<h2 className=''>
						Register
					</h2>
					<p className=''>
						Register for a free A-T-Anime account
					</p>
				</header>
				<div action='' id='registerform' style={registerProps}>
					<Signup />
				</div>
			</section>

			<section className=''>
				<header className='col s12 m12 l6'>
					<h2 className=''>
						Log In
					</h2>
					<p className=''>
						Already have an account? Log in below.
					</p>
				</header>
				<div action='' id='loginform' style={loginProps}>
					<Login />
				</div>
			</section>

		</div>
	);
};
export default Registersignup;