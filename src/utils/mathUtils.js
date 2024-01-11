
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

function roundToNext5000(num) {
    return Math.ceil(num/5000)*5000;
}

function getMaxNum(arr) {
    return Math.max(arr);
}

export { getRandomNum, roundToNext5000 };