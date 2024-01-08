import { NavLink } from 'react-router-dom';
import leash from '../../assets/icons/leash-red.svg';
import heart from '../../assets/icons/heart3.svg';
import paws from '../../assets/icons/paws-green.svg';
import './BottomNav.scss';

function BottomNav({ page }) {

    let mainImage;

    switch(page) {
        case 'home':
            mainImage = paws;
            break;
        default: 
            mainImage = '';
    }


    return (
        <nav className="bottom-bar">
            <NavLink to='/' className="bottom-nav__item">
                <img src={heart} alt="heart" className="bottom-bar__button" />
            </NavLink>
            <NavLink to='' className="bottom-nav__item bottom-nav__item--main">
                <img src={mainImage} alt="" className="bottom-bar__button bottom-bar__button--main" />
            </NavLink>
            <NavLink to='/walk' className="bottom-nav__item">
                <img src={leash} alt="dog leash" className="bottom-bar__button" />
            </NavLink>
        </nav>
    );
}

export default BottomNav;