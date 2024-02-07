import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formIsValid, getInputError } from '../../utils/validationUtils';
import { login } from '../../utils/userUtils';
import back from '../../assets/icons/left_line.svg';
import loginImage from '../../assets/static-images/login-image.svg';
import './Login.scss';

function Login({ setSignedIn }) {
    let navigate = useNavigate();
    let [ inputs, setInputs ] = useState({ loginUsername: '', loginPassword: '' });
    let { loginUsername, loginPassword } = inputs;

    let [ errors, setErrors ] = useState({
        loginUsername: null, 
        loginPassword: null, 
    });
    let { loginUsername: loginUsernameErrors, loginPassword: loginPasswordErrors } = errors;

    console.log(errors);

    let [ message, setMessage ] = useState(null);


    async function handleInputChange(event) {
        let { name, value } = event.target;
        setInputs({...inputs, [name]: value});
        setErrors({...errors, [name]: await getInputError(name, value)})
    }

    async function handleInputBlur(event) {
        const { name, value } = event.target;
        setErrors({...errors, [name]: await getInputError(name, value)});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (formIsValid(inputs)) {
            login(
              loginUsername, loginPassword, setSignedIn,
              () => {
                setMessage("Logged In Successfully");
                setTimeout(() => {navigate('/')}, 1500);
              },
              (error) => {
                console.log("Error logging in", error);
                setMessage('Error logging in');
              }
            );
        } else {
            let newErrors = {};
            for(let key in inputs) {
                newErrors[key] = await getInputError(key, inputs[key]);
            }
            setErrors(newErrors);
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
            <div className="login-left">
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1 className='login-form__title'>Welcome Back!</h1>
                    <input 
                        type="text" 
                        name='loginUsername' 
                        className={`login-form__input ${loginUsernameErrors && 'login-form__input--invalid'}`} 
                        placeholder='Username'
                        value={loginUsername}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    { loginUsernameErrors && <p className="login-form__error">
                        {loginUsernameErrors}
                    </p> }
                    <input 
                        type="password" 
                        name='loginPassword' 
                        className={`login-form__input ${loginPasswordErrors && 'login-form__input--invalid'}`}
                        placeholder='Password'
                        value={loginPassword}
                        onChange={handleInputChange} 
                        onBlur={handleInputBlur}
                    />
                    { loginPasswordErrors && <p className="login-form__error">
                        {loginPasswordErrors}
                    </p> }
                    <button className="login-form__button" disabled={!formIsValid(inputs)}>
                        Sign In
                    </button>
                    <p className='login-form__text'>Don't have an account? 
                        <Link to='/register' className='login-form__text login-form__text--highlight'> Sign up</Link>
                    </p>
                    {message && <p className='register-form__text'>{message}</p>}
                </form>
            </div>
            <div className="login-right">
                <img src={loginImage} alt="A dog" className="login-right__image" />
            </div>
        </div>
    );
}

export default Login;