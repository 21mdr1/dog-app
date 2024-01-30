import { blink, wagTail, stickTongueOut, bobHead, moveNaturally } from '../../utils/animationUtils';
import { useState, useEffect } from 'react';
import WalkingDog from '../WalkingDog/WalkingDog';
import './AnimatedWalkingDog.scss';

function AnimatedWalkingDog() {

    // let [ isWalking, setIsWalking ] = useState(false);

    let [ isBobbingHead, setIsBobbingHead] = useState(false);
    let [ tongueIsOut, setTongueIsOut ] = useState(false);
    let [ isWaggingTail, setIsWaggingTail ] = useState(false);
    let [ isBlinking, setIsBlinking ] = useState(false);

    useEffect(() => {

        let intervals = [];

        intervals.concat(moveNaturally(blink, setIsBlinking));
        intervals.concat(moveNaturally(wagTail, setIsWaggingTail));
        intervals.concat(moveNaturally(stickTongueOut, setTongueIsOut));

        // let blinkId = setTimeout(() => {
        //     setInterval(blink, 7000, setIsBlinking)
        // }, 5000)

        // let wagTailId = setTimeout(() => {
        //     setInterval(wagTail, 5000, setIsWaggingTail);
        // }, 0);

        // let stickTongueOutId = setTimeout(() => {
        //     setInterval(stickTongueOut, 15000, setTongueIsOut)
        // }, 7000)

        return () => {
            for (let interval of intervals) {
                clearInterval(interval);
            }
        }
    }, []);

    return (
        <WalkingDog
            isBobbingHead={isBobbingHead}
            tongueIsOut={tongueIsOut}
            isWaggingTail={isWaggingTail}
            isBlinking={isBlinking}
        />
    );
}

export default AnimatedWalkingDog;