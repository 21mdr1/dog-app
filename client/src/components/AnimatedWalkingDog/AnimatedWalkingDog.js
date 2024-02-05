import { blink, wagTail, stickTongueOut, bobHead, moveNaturally } from '../../utils/animationUtils';
import { useState, useEffect } from 'react';
import WalkingDog from '../WalkingDog/WalkingDog';
import './AnimatedWalkingDog.scss';

function AnimatedWalkingDog() {

    let [ isBobbingHead, setIsBobbingHead] = useState(false);
    let [ tongueIsOut, setTongueIsOut ] = useState(false);
    let [ isWaggingTail, setIsWaggingTail ] = useState(false);
    let [ isBlinking, setIsBlinking ] = useState(false);

    useEffect(() => {
        let intervals = [];

        intervals.concat(moveNaturally(blink, setIsBlinking));
        intervals.concat(moveNaturally(wagTail, setIsWaggingTail));
        intervals.concat(moveNaturally(stickTongueOut, setTongueIsOut));
        intervals.concat(moveNaturally(bobHead, setIsBobbingHead));

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