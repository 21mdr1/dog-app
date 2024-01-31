import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formIsValid } from '../../utils/validationUtils';
import { login } from '../../utils/userUtils';
import back from '../../assets/icons/left_line.svg';
import './Login.scss';

function Login({ setSignedIn }) {
    let navigate = useNavigate();
    let [ inputs, setInputs ] = useState({ username: '', password: '' });
    let { username, password } = inputs;

    let [ message, setMessage ] = useState(null);


    function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formIsValid(inputs)) {
            login(
              username, password, setSignedIn,
              () => {
                setMessage("Logged In Successfully");
                setTimeout(() => {navigate('/')}, 2000);
              },
              (error) => {
                console.log("Error logging in", error);
                setMessage('Error logging in');
              }
            );
        } else {
            setMessage('Error logging in');
        }
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
                    name='username' 
                    className="login-form__input" 
                    placeholder='Username'
                    value={username}
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
                <button className="login-form__button" disabled={!formIsValid(inputs)}>
                    Sign In
                </button>
                <p className='login-form__text'>Don't have an account? 
                    <Link to='/register' className='login-form__text login-form__text--highlight'> Sign up</Link>
                </p>
                {message && <p className='register-form__text'>{message}</p>}
            </form>
        </div>
    );
}

export default Login;