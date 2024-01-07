import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.scss';

function TopNav() {
    let [ avatar, setAvatar ] = useState('');

    useEffect(() => {
        setAvatar('https://api.multiavatar.com/maria.svg');
    }, []);

    return (
        <div className="top-nav">
            <Link to='/user'>
                <img src={avatar} alt="user avatar" className="top-nav__avatar" />
            </Link>
        </div>
    );
}

export default TopNav;