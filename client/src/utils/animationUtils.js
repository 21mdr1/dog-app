
import { getRandomNum } from './mathUtils';

function blink(setIsBlinking) {
    setIsBlinking(true);
    setTimeout(setIsBlinking, 650, false);
}

function wagTail(setIsWaggingTail) {
    setIsWaggingTail(true);
    setTimeout(setIsWaggingTail, 2000, false)
}

function stickTongueOut(setIsStickingTongueOut) {
    setIsStickingTongueOut(true);
    setTimeout(setIsStickingTongueOut, 1200, false);
}

function bobHead(setIsBobbingHead) {
    setIsBobbingHead(true);
    setTimeout(setIsBobbingHead, 2500, false);
}

function moveNaturally(action, setAction) {
    let intervals = [];

    let delay = getRandomNum(10) * 1000;
    setTimeout(action, delay, setAction);

    for (let i = 0; i < 3; i++) {
        let delay = (getRandomNum(10) + 10) * 1000;
        intervals.push(setInterval(action, delay, setAction))
    }

    return intervals;
}

export { blink, wagTail, stickTongueOut, bobHead, moveNaturally };