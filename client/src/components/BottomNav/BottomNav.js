import { NavLink } from 'react-router-dom';
import { Tooltip } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { getPreferences } from '../../utils/storageUtils';
import collar from '../../assets/icons/collar-red.svg';
import heart from '../../assets/icons/heart.svg';
import paws from '../../assets/icons/paws-green.svg';
import './BottomNav.scss';

function BottomNav({ page, clickHandler, signedIn}) {
    let mainImage, tooltipMessage;

    let [ tooltips, setTooltips ] = useState(false);

    useEffect(() => {
        getPreferences(signedIn, (data) => {data && setTooltips(data.tooltips)})
    }, [signedIn]);

    switch(page) {
        case 'home':
            mainImage = '';
            tooltipMessage = '';
            break;
        case 'walk':
            mainImage = paws;
            tooltipMessage = "Log Walk";
            break;
        default: 
            mainImage = '';
            tooltipMessage = '';
    }


    return (
        <nav className={`bottom-nav bottom-nav--${page}`}>
            {tooltips ? 
            <Tooltip content="Home">
                <NavLink to='/' className={`bottom-nav__item bottom-nav__item--${page}`}>
                    <img src={heart} alt="heart" className={`bottom-nav__button bottom-nav__button--${page}`} />
                </NavLink>
            </Tooltip> :
            <NavLink to='/' className={`bottom-nav__item bottom-nav__item--${page}`}>
                <img src={heart} alt="heart" className={`bottom-nav__button bottom-nav__button--${page}`} />
            </NavLink>
            }
            {tooltips && tooltipMessage ?
            <Tooltip content={tooltipMessage} >
                <button type='button' className={`bottom-nav__main-item bottom-nav__main-item--${page}`} onClick={clickHandler}>
                    <img src={mainImage} alt="" className={`bottom-main-button bottom-main-button--${page}`} />
                </button>
            </Tooltip>: 
            <button type='button' className={`bottom-nav__main-item bottom-nav__main-item--${page}`} onClick={clickHandler}>
                <img src={mainImage} alt="" className={`bottom-main-button bottom-main-button--${page}`} />
            </button>}
            {tooltips ? 
            <Tooltip content="Walk">
                <NavLink to='/walk' className={`bottom-nav__item bottom-nav__item--${page}`}>
                    <img src={collar} alt="dog leash" className={`bottom-nav__button bottom-nav__button--${page}`} />
                </NavLink>
            </Tooltip> : 
            <NavLink to='/walk' className={`bottom-nav__item bottom-nav__item--${page}`}>
                <img src={collar} alt="dog leash" className={`bottom-nav__button bottom-nav__button--${page}`} />
            </NavLink>}
        </nav>
    );
}

export default BottomNav;