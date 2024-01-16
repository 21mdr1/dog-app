import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.scss';

function TopNav({ page }) {
    let [ avatar, setAvatar ] = useState('');

    useEffect(() => {
        setAvatar('https://api.multiavatar.com/maria.svg');
    }, []);

    return (
        <nav className={`top-nav top-nav--${page}`}>
            <Link to='/login' className={`top-nav__link top-nav__link--${page}`}>
                Log In
            </Link>
            <Link to='/user'>
                <img src={avatar} alt="user avatar" className="avatar" />
            </Link>
        </nav>
    );
}

export default TopNav;