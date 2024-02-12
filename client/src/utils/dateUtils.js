
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

function getLast7Days() {
    let days = [];
    
    // objects that look like:
    //  {steps: 0, date: timestamp, formatted_date: mm/dd/yyyy}
    // new Date(item.timestamp).toDateString();

    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);

        let date = d.getTime();
        let formatted_date = d.toDateString();

        days.push({
            steps: 0,
            date: date,
            formatted_date: formatted_date
        });
    }

    return days;
}

function isInLastWeek(timestamp) {
    let startTimestamp = new Date(Date.now() - 6 * (1000 * 3600 * 24)).setHours(0, 0, 0, 0);
    
    return timestamp > startTimestamp;
}

function isToday(timestamp) {
    let date = new Date(timestamp).toDateString();
    let today = new Date().toDateString();

    return today === date;
}

function isYesterday(timestamp) {
    let date = new Date(timestamp).toDateString();
    let yesterday = new Date(Date.now() - (1000 * 3600 * 24)).toDateString();

    return yesterday === date;
}

export { getWeekday, getLast7Days, isInLastWeek, isToday, isYesterday, getTimestamp, getDate };