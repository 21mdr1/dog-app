import { getWeekday, isInLastWeek } from "./dateUtils";

// Helpers

function clearLocalCache(key) {
    localStorage.removeItem(key);
}

function saveLocally(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocally(key) {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

function purgeOldLocalSteps(data) {
    for(let i = 0; i < data.length; i++) {
        // newer data will always be at the end of the array
        if (isInLastWeek(data[0].timestamp)) {
            break;
        }
        data.unshift();
    }

    return data;
}

// Actions

function recordStepsLocally(steps) {
    steps.timestamp = Date.now();

    let data = getLocally('stepsWalked') || [];
    data = purgeOldLocalSteps(data);
    data.push(steps);

    saveLocally('stepsWalked', data);
}

function getLastWeeksStepsLocally() {
    let data = getLocally('stepsWalked') || [];

    let last7Days = [];
    for(let item of data) {
        if (!(isInLastWeek(item.timestamp))) {
            continue;
        }
        let date = getWeekday(item.timestamp); // maybe turn to date instead of weekday?

        let index = last7Days.findIndex((el) => el.date === date);
        if (index === -1) {
            last7Days.push({date: date, steps: item.steps});
            continue;
        }

        last7Days[index].steps += item.steps;
    }

    return last7Days;
}

function getAllStepsLocally() {
    return getLocally('stepsWalked') || [];
}

function recordPreferencesLocally(preference, value) { 
    let defaults = {
        avatar: null,
        animal: 'dog',
        accessories: null,
        tooltips: true,
    };

    let preferences = getLocally('preferences') || defaults;

    preferences[preference] = value;
    saveLocally(preferences);
}


function getPreferencesLocally() {
    return getLocally('preferences');
}


export { recordStepsLocally, getAllStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally, getPreferencesLocally, getLocally, saveLocally, clearLocalCache };