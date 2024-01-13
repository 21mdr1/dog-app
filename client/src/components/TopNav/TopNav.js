import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.scss';

function TopNav() {
    let [ avatar, setAvatar ] = useState('');

    useEffect(() => {
        setAvatar('https://api.multiavatar.com/maria.svg');
    }, []);

    return (
        <nav className="top-nav">
            <Link to='/user'>
                <img src={avatar} alt="user avatar" className="avatar" />
            </Link>
        </nav>
    );
}

export default TopNav;