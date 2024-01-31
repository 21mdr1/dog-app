import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/icons/left_line.svg';
import './TopNav.scss';

function TopNav({ page, signedIn }) {
    let [ avatar, setAvatar ] = useState('');

    useEffect(() => {
        setAvatar('https://api.multiavatar.com/maria.svg');
    }, []);

    return (
        <nav className={`top-nav top-nav--${page}`}>
            <Link to='/' className={`back-button back-button--${page}`}>
                <img src={back} alt="back" className="back-button__image" />
                <span className="back-button__text">back</span>
            </Link>
            {!signedIn && <Link to='/login' className={`top-nav__link top-nav__link--${page}`}>
                Log In
            </Link> }
            <Link to='/user' className='avatar__wrapper'>
                <img src={avatar} alt="user avatar" className="avatar" />
            </Link>
        </nav>
    );
}

export default TopNav;