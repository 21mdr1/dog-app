
function getDate(timestamp) {
    const formatter = new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: "numeric"});
    return formatter.format(timestamp);
}


function getTimestamp(date) {
    if (!String(date).includes('/')) {
        return date;
    }

    let [ d, m, y ] = date.split("/");
    let dateObj = new Date(y, m-1, d);
    return dateObj.getTime();
}

function getWeekday(date) {
    let timestamp = getTimestamp(date);
    const formatter = new Intl.DateTimeFormat('en-US', {weekday: 'short'});
    return formatter.format(timestamp).toLowerCase();
}

function getLast7Days(format) {
    let days = [];
    
    for (let i=0; i<7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);

        let day = format === 'weekday' ? getWeekday(d) : d;
        days.push(day);
    }

    return days;
}

function isInLastWeek(timestamp) {
    let today = Date.now();
    let day = 1000 * 3600 * 24;
    let difference = Math.floor((today - timestamp) / day);

    return difference < 7;
}

function isToday(timestamp) {
    let today = Date.now();
    let day = 1000 * 3600 * 24;
    let difference = Math.floor((today - timestamp) / day);

    return difference < 1;
}

export { getWeekday, getLast7Days, isInLastWeek, isToday, getTimestamp, getDate };