import { Link } from 'react-router-dom';
import back from '../../assets/icons/left_line.svg';
import './Login.scss';

function Login() {
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
            <form className='login-form'>
                <h1 className='login-form__title'>Welcome Back!</h1>
                <input 
                    type="text" 
                    name='email' 
                    className="login-form__input" 
                    placeholder='Email'
                />
                <input 
                    type="password" 
                    name='password' 
                    className="login-form__input"
                    placeholder='Password' 
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