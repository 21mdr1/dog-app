import { useState, useEffect } from 'react';
import './AnimatedSittingDog.scss';
import SittingDog from '../SittingDog/SittingDog';

function AnimatedSittingDog() {
    let [ isBlinking, setIsBlinking ] = useState(false);

    return (
        <SittingDog isBlinking={isBlinking} />
    );

}

export default AnimatedSittingDog;