import { useState, useEffect } from 'react';
import WalkingDog from '../WalkingDog/WalkingDog';
import './AnimatedWalkingDog.scss';

function AnimatedWalkingDog() {

    // let [ isWalking, setIsWalking ] = useState(false);

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

    return (
        <WalkingDog
            isHeadBobbing={isHeadBobbing}
            tongueIsOut={tongueIsOut}
            isWaggingTail={isWaggingTail}
            isBlinking={isBlinking}
        />
    );
}

export default AnimatedWalkingDog;