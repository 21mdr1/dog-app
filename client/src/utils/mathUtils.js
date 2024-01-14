
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

function roundToNext5000(num) {
    return Math.ceil(num/5000)*5000;
}

function getMins({ hours, mins, secs }) {
    return (hours*60 + mins + secs/60);
}

function convertToSteps(mins) {
    return mins*60;
}

function convertTimeToSteps(time) {
    return convertToSteps(getMins(time));
}

export { getRandomNum, roundToNext5000, convertTimeToSteps, getMins, convertToSteps };