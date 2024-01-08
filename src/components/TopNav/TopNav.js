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
                <div className="avatar__container">
                    <img src={avatar} alt="user avatar" className="avatar" />
                    <div className="avatar__mask"></div>
                </div>
            </Link>
        </nav>
    );
}

export default TopNav;