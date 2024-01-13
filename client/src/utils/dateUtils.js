
function getWeekday(timestamp) {
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

export { getWeekday, getLast7Days };