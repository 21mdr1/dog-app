import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPreferences } from '../../utils/storageUtils';
import back from '../../assets/icons/left_line.svg';
import './TopNav.scss';

function TopNav({ page, signedIn }) {
    let [ avatar, setAvatar ] = useState('');

    useEffect(() => {
        getPreferences(signedIn, (data) => {data && setAvatar(data.avatar)})
    }, [signedIn]);

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
                {avatar ? 
                    <img src={avatar} alt="user avatar" className="avatar" /> 
                    :
                    <div className="avatar avatar--placeholder"></div>
                }
            </Link>
        </nav>
    );
}

export default TopNav;