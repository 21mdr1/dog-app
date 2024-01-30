import dog from '../../assets/static-images/home-dog-prototype-2.svg';

import { ReactComponent as Face } from '../../assets/animations/sitting-dog/bare-face.svg';
import { ReactComponent as BlinkEye } from '../../assets/animations/sitting-dog/blink-eye.svg';
import { ReactComponent as Body } from '../../assets/animations/sitting-dog/body.svg';
import { ReactComponent as LeftEar } from '../../assets/animations/sitting-dog/left-ear.svg';
import { ReactComponent as RightEar } from '../../assets/animations/sitting-dog/right-ear.svg';
import { ReactComponent as Neck } from '../../assets/animations/sitting-dog/neck.svg';
import { ReactComponent as Eye } from '../../assets/animations/sitting-dog/right-eye.svg';
import { ReactComponent as Tail } from '../../assets/animations/sitting-dog/full-tail.svg';
import { ReactComponent as Tongue } from '../../assets/animations/sitting-dog/tongue.svg';

import { useState } from 'react';
import './SittingDog.scss';

function SittingDog() {

    let [ isBlinking, setIsBlinking ] = useState(false);

    return (
        <main className="home-main">
            {/* <div className="sitting-dog__container">
                <div className="sitting-dog__shadow"></div>
                <img src={dog} alt="sitting dog" className="sitting-dog" />
            </div> */}
            <div className="sitting-dog">
                <div className="sitting-dog__shadow"></div>
                <div className='sitting-dog__full-body'>
                    <Tail className='sitting-dog__tail' />
                    <Body className='sitting-dog__body' />
                    <Neck className='sitting-dog__neck' />
                </div>
                <div className='sitting-dog__head'>
                    <Face className='sitting-dog__face' />
                    <Eye className={`sitting-dog__eye sitting-dog__eye--right ${isBlinking && 'sitting-dog__eye--blinking'}`} />
                    <Eye className={`sitting-dog__eye sitting-dog__eye--left ${isBlinking && 'sitting-dog__eye--blinking'}`} />
                    <BlinkEye className={`sitting-dog__blink-eye sitting-dog__blink-eye--right ${isBlinking && 'sitting-dog__blink-eye--blinking'}`} />
                    <BlinkEye className={`sitting-dog__blink-eye sitting-dog__blink-eye--left ${isBlinking && 'sitting-dog__blink-eye--blinking'}`} />
                    <Tongue className='sitting-dog__tongue' />
                    <LeftEar className='sitting-dog__ear sitting-dog__ear--left' />
                    <RightEar className='sitting-dog__ear sitting-dog__ear--right' />
                </div>
            </div>
        </main>
    );
}

export default SittingDog;