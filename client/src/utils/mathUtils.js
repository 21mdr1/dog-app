
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

function roundToNext5000(num) {
    return Math.ceil(num/5000)*5000;
}

function convertToMins({ hours, minutes, seconds }) {
    return (hours*60 + minutes + seconds/60);
}

function convertToSteps(mins) {
    return mins*60;
}

// may not need this one:

function convertTimeToSteps(time) {
    return convertToSteps(convertToMins(time));
}

export { getRandomNum, roundToNext5000, convertTimeToSteps, convertToMins, convertToSteps };