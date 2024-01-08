import { NavLink } from 'react-router-dom';
import leash from '../../assets/icons/leash-red-smaller.svg';
import heart from '../../assets/icons/heart3.svg';
import paws from '../../assets/icons/paws-green.svg';
import './BottomNav.scss';

function BottomNav({ page, clickHandler}) {
    let mainImage;

    function walkClickHandler(event) {
    }

    switch(page) {
        case 'home':
            mainImage = '';
            break;
        case 'walk':
            mainImage = paws;
            break;
        default: 
            mainImage = '';
    }


    return (
        <nav className={`bottom-nav bottom-nav--${page}`}>
            <NavLink to='/' className={`bottom-nav__item bottom-nav__item--${page}`}>
                <img src={heart} alt="heart" className={`bottom-nav__button bottom-nav__button--${page}`} />
            </NavLink>
            <button type='button' className={`bottom-nav__main-item bottom-nav__main-item--${page}`} onClick={clickHandler}>
                <img src={mainImage} alt="" className={`bottom-main-button bottom-main-button--${page}`} />
            </button>
            <NavLink to='/walk' className={`bottom-nav__item bottom-nav__item--${page}`}>
                <img src={leash} alt="dog leash" className={`bottom-nav__button bottom-nav__button--${page}`} />
            </NavLink>
        </nav>
    );
}

export default BottomNav;