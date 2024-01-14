
function getRandomNum(max) { // will delete soon
    return Math.floor(Math.random() * max);
}

function roundToNext5000(num) {
    return Math.ceil(num/5000)*5000;
}

function convertToMins({ hours, minutes, seconds }) {
    return (Number(hours)*60 + Number(minutes) + Number(seconds)/60);
}

function convertToSteps(mins) {
    return mins*60;
}

export { getRandomNum, roundToNext5000, convertToMins, convertToSteps };