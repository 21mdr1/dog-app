import { Link } from 'react-router-dom';
import { useState } from 'react';
import back from '../../assets/icons/left_line.svg';
import './Login.scss';

function Login() {
    const defaults = {
        email: '',
        password: '',
    }
    let [ inputs, setInputs ] = useState(defaults);
    let { email, password } = inputs;

    function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <div className='page page--login'>
            <Link to='/' className="back-button back-button--login">
                <img 
                    src={back} 
                    alt="back" 
                    className="back-button__image back-button__image--login" 
                />
                <span className="back-button__text back-button__text--login">Back</span>
            </Link>
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-form__title'>Welcome Back!</h1>
                <input 
                    type="text" 
                    name='email' 
                    className="login-form__input" 
                    placeholder='Email'
                    value={email}
                    onChange={handleInputChange}
                />
                <input 
                    type="password" 
                    name='password' 
                    className="login-form__input"
                    placeholder='Password'
                    value={password}
                    onChange={handleInputChange} 
                />
                <button className="login-form__button">
                    Sign In
                </button>
                <p className='login-form__text'>Don't have an account? 
                    <Link to='/register' className='login-form__text login-form__text--highlight'> Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;