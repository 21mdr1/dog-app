import { isInLastWeek, getDate, isToday } from "./dateUtils";

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

function recordStepsLocally(steps, onSuccess = () => {}, onFailure = (error) => {console.log('Error saving steps:', error)}) {
    try {
        steps.timestamp = Date.now();

        let data = getLocally('stepsWalked') || [];
        data = purgeOldLocalSteps(data);
        data.push(steps);

        saveLocally('stepsWalked', data);
        onSuccess(data);
    } catch(error) {
        onFailure(error);
    }
}

function getLastWeeksStepsLocally(onSuccess = () => {}, onFailure = (data) => {console.log('Error getting setps', data)}) {
    try {
        let data = getLocally('stepsWalked') || [];

        let last7Days = [];
        for(let item of data) {
            if (!(isInLastWeek(item.timestamp))) {
                continue;
            }
            let date = getDate(item.timestamp);

            let index = last7Days.findIndex((el) => el.date === date);
            if (index === -1) {
                last7Days.push({date: date, steps: item.steps});
                continue;
            }

            last7Days[index].steps += item.steps;
        }

        onSuccess(last7Days);

        return last7Days;
    } catch (error) {
        onFailure(error);
    }
}

function getTodaysStepsLocally(onSuccess = () => {}, onFailure = (data) => {console.log('Error getting setps', data)}) {
    try {
        let data = getLocally('stepsWalked') || [];

        let todaysSteps = {date: getDate(Date.now()), steps: 0};
        
        for(let item of data) {
            if (!(isToday(item.timestamp))) {
                continue;
            }

            todaysSteps.steps += item.steps;
        }

        onSuccess([todaysSteps]);

        return [todaysSteps];
    } catch (error) {
        onFailure(error);
    }
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


export { recordStepsLocally, getAllStepsLocally, getTodaysStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally, getPreferencesLocally, getLocally, saveLocally, clearLocalCache };