import dog from '../../assets/static-images/home-dog-prototype-2.svg';

import { ReactComponent as LeftBackLeg } from '../../assets/animations/walking-dog/back-leg-left.svg';
import { ReactComponent as Body } from '../../assets/animations/walking-dog/body.svg';
import { ReactComponent as RightBackLeg } from '../../assets/animations/walking-dog/back-leg-right.svg';
import { ReactComponent as LeftFrontLeg } from '../../assets/animations/walking-dog/front-leg-left.svg';
import { ReactComponent as RightFrontLeg } from '../../assets/animations/walking-dog/front-leg-right.svg';
import { ReactComponent as Head } from '../../assets/animations/walking-dog/head.svg';
import { ReactComponent as LeftEye } from '../../assets/animations/walking-dog/left-eye.svg';
import { ReactComponent as RightEye } from '../../assets/animations/walking-dog/right-eye.svg';
import { ReactComponent as Tail } from '../../assets/animations/walking-dog/tail.svg';
import { ReactComponent as Tongue } from '../../assets/animations/walking-dog/tongue.svg';

import { useState, useEffect } from 'react';
import './WalkingDog.scss';

function WalkingDog() {

    let [ isWalking, setIsWalking ] = useState(false);

    let [ isHeadBobbing, setIsHeadBobbing] = useState(false);
    let [ tongueIsOut, setTongueIsOut ] = useState(false);
    let [ isWaggingTail, setIsWaggingTail ] = useState(false);
    let [ isBlinking, setIsBlinking ] = useState(false);

    useEffect(() => {
        function blink() {
            function changeEyes() {
                setIsBlinking(true);
                setTimeout(
                    () => setIsBlinking(false),
                    1000
                );
            }

            setTimeout(() => {
                setInterval(changeEyes, 7000)
            }, 5000)
        }

        function wagTail() {
            function moveTail() {
                setIsWaggingTail(true);
                setTimeout(
                    () => setIsWaggingTail(false), 
                    2000
                );
            }

            setTimeout(() => {
                setInterval(moveTail, 5000);
            }, 0);
        }

        function stickTongueOut() {
            function changeTongue() {
                setTongueIsOut(true);
                setTimeout(
                    () => setTongueIsOut(false),
                    1200
                )
            }

            setTimeout(() => {
                setInterval(changeTongue, 15000)
            }, 7000)
        }

        blink();
        wagTail();
        stickTongueOut();

    }, []);

    function determineClasses() {
        let walking = isWalking ? 'walking-dog--isWalking' : null;
        let blinking = isBlinking ? 'walking-dog--isBlinking' : null;
        let tailWagging = isWaggingTail ? 'walking-dog--isWaggingTail' : null;
        let tongueOut = tongueIsOut ? 'walking-dog--isStickingTongueOut' : null;

        return `walking-dog ${walking} ${blinking} ${tongueOut} ${tailWagging}`;
    }

    return (
        <main className="home-main">
            <div className={`${determineClasses()}`} onClick={() => setIsWalking(!isWalking)}>
                <div className="walking-dog__shadow"></div>
                <div className='walking-dog__head'>
                    <Head className='walking-dog__face' />
                    <LeftEye className='walking-dog__eye walking-dog__eye--left' />
                    <RightEye className='walking-dog__eye walking-dog__eye--right' />
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