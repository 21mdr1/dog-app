import { Link } from 'react-router-dom';
import { useState } from 'react';
import { formIsValid, inputIsValid } from '../../utils/validationUtils';
import back from '../../assets/icons/left_line.svg';
import './Register.scss';

function Register() {
    const defaults = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    }
    let [ inputs, setInputs ] = useState(defaults);
    let { email, username, password, confirmPassword } = inputs;

    function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <div className='page page--register'>
            <Link to='/' className="back-button back-button--register">
                <img 
                    src={back} 
                    alt="back" 
                    className="back-button__image back-button__image--register" 
                />
                <span className="back-button__text back-button__text--register">Back</span>
            </Link>
            <form className='register-form' onSubmit={handleSubmit}>
                <h1 className='register-form__title'>Create an Account</h1>
                <input 
                    type="text" 
                    name='email' 
                    className={`register-form__input ${!inputIsValid('email', email) && 'register-form__input--invalid'}`}
                    placeholder='Email'
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name='username' 
                    className={`register-form__input ${!inputIsValid('username', username) && 'register-form__input--invalid'}`}
                    placeholder='Username'
                    value={username}
                    onChange={handleInputChange}
                />
                <input 
                    type="password" 
                    name='password' 
                    className={`register-form__input ${!inputIsValid('password', password) && 'register-form__input--invalid'}`}
                    placeholder='Password'
                    value={password}
                    onChange={handleInputChange} 
                />
                <input 
                    type="password" 
                    name='confirmPassword' 
                    className={`register-form__input ${!inputIsValid('confirmPassword', confirmPassword, password) && 'register-form__input--invalid'}`} 
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={handleInputChange}
                />
                <button className="register-form__button" disabled={!formIsValid(inputs)}>
                    Create Account
                </button>
                <p className='register-form__text'>Already have an account? 
                    <Link to='/login' className='register-form__text register-form__text--highlight'> Log in</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;