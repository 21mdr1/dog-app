import { moveNaturally, blink } from '../../utils/animationUtils';
import { useState, useEffect } from 'react';
import SittingDog from '../SittingDog/SittingDog';
import './AnimatedSittingDog.scss';


function AnimatedSittingDog() {
    let [ isBlinking, setIsBlinking ] = useState(false);

    useEffect(() => {
        let intervals = [];

        intervals.concat(moveNaturally(blink, setIsBlinking));

        return () => {
            for (let interval of intervals) {
                clearInterval(interval);
            }
        }
    }, []);

    return (
        <SittingDog isBlinking={isBlinking} />
    );

}

export default AnimatedSittingDog;