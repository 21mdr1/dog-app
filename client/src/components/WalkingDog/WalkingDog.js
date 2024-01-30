import { ReactComponent as LeftBackLeg } from '../../assets/animations/walking-dog/back-leg-left.svg';
import { ReactComponent as Body } from '../../assets/animations/walking-dog/body.svg';
import { ReactComponent as RightBackLeg } from '../../assets/animations/walking-dog/back-leg-right.svg';
import { ReactComponent as LeftFrontLeg } from '../../assets/animations/walking-dog/front-leg-left.svg';
import { ReactComponent as RightFrontLeg } from '../../assets/animations/walking-dog/front-leg-right.svg';
import { ReactComponent as Head } from '../../assets/animations/walking-dog/head.svg';
import { ReactComponent as LeftEye } from '../../assets/animations/walking-dog/left-eye.svg';
import { ReactComponent as RightEye } from '../../assets/animations/walking-dog/right-eye.svg';
import { ReactComponent as LeftEyeBlink } from '../../assets/animations/walking-dog/left-eye-blink.svg';
import { ReactComponent as RightEyeBlink } from '../../assets/animations/walking-dog/right-eye-blink.svg';
import { ReactComponent as Tail } from '../../assets/animations/walking-dog/tail.svg';
import { ReactComponent as Tongue } from '../../assets/animations/walking-dog/tongue.svg';

import { useState } from 'react';
import './WalkingDog.scss';

function WalkingDog({ isBobbingHead, tongueIsOut, isWaggingTail, isBlinking }) {

    let [ isWalking, setIsWalking ] = useState(false);

    function determineClasses() {
        let walking = isWalking ? 'walking-dog--isWalking' : null;
        let blinking = isBlinking ? 'walking-dog--isBlinking' : null;
        let tailWagging = isWaggingTail && !isWalking ? 'walking-dog--isWaggingTail' : null;
        let tongueOut = tongueIsOut ? 'walking-dog--isStickingTongueOut' : null;
        let headBobbing = isBobbingHead && !isWalking ? 'walking-dog--isBobbingHead' : null;

        return `walking-dog ${walking} ${blinking} ${tongueOut} ${tailWagging} ${headBobbing}`;
    }

    return (
        <main className="home-main">
            <div className={`${determineClasses()}`} onClick={() => setIsWalking(!isWalking)}>
                <div className="walking-dog__shadow"></div>
                <div className='walking-dog__head'>
                    <Head className='walking-dog__face' />
                    <LeftEye className='walking-dog__eye walking-dog__eye--left' />
                    <LeftEyeBlink className='walking-dog__blink-eye walking-dog__blink-eye--left' />
                    <RightEye className='walking-dog__eye walking-dog__eye--right' />
                    <RightEyeBlink className='walking-dog__blink-eye walking-dog__blink-eye--right' />
                    <Tongue className='walking-dog__tongue' />
                </div>
                <div className='walking-dog__full-body'>
                    <Tail className='walking-dog__tail' />
                    <RightBackLeg className='walking-dog__right-back-leg' />
                    <RightFrontLeg className='walking-dog__right-front-leg' />
                    <Body className='walking-dog__body' />
                    <LeftBackLeg className='walking-dog__left-back-leg' />
                    <LeftFrontLeg className='walking-dog__left-front-leg' />
                </div>
            </div>
        </main>
    );
}

export default WalkingDog;