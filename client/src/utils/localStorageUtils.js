import { isInLastWeek, isToday, isYesterday } from "./dateUtils";

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

function getStreakLocally(onSuccess = () => {}, onFailure = (error) => {console.log('Error getting streak:', error)}) {
    try {
        let currentStreak = Number(localStorage.getItem('streak'));
        if(streak.isNaN()) {
            currentStreak = 0;
        }
        onSuccess(currentStreak);
        return currentStreak;
    } catch (error) {
        onFailure(error);
    }   
}

function increaseStreakLocally(onSuccess = () => {}, onFailure = (error) => {console.log('Error updating streak:', error)}) {
    try {
        let currentStreak = getStreakLocally();
        localStorage.setItem('streak', (currentStreak + 1).toString());
        onSuccess(currentStreak + 1);
    } catch (error) {
        onFailure(error);
    }   
}

function resetStreakLocally(onSuccess = () => {}, onFailure = (error) => {console.log('Error updating streak:', error)}) {
    try {
        localStorage.setItem('streak', "0");
        onSuccess(0);
    } catch (error) {
        onFailure(error)
    }
}

function recordStepsLocally(steps, onSuccess = () => {}, onFailure = (error) => {console.log('Error saving steps:', error)}) {

    try {
        // update streak
        let currentSteps = getTodaysStepsLocally();
        if (currentSteps < 10000 && currentSteps + steps.steps >= 10000) {
            increaseStreakLocally();
        }

        // log steps
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
            let formatted_date = new Date(item.timestamp).toDateString();

            let index = last7Days.findIndex((el) => el.formatted_date === formatted_date);
            if (index === -1) {
                last7Days.push({
                    formatted_date: formatted_date,
                    date: item.timestamp, 
                    steps: item.steps
                });
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

function getYesterdaysStepsLocally(onSuccess = () => {}, onFailure = (data) => {console.log('Error getting setps', data)}) {
    try {
        let data = getLocally('stepsWalked') || [];

        let yesterdaysSteps = {date: Date.now() - (1000 * 3600 * 24), steps: 0};
        
        for(let item of data) {
            if (!(isYesterday(item.timestamp))) {
                continue;
            }

            yesterdaysSteps.steps += item.steps;
        }

        onSuccess([yesterdaysSteps]);

        return [yesterdaysSteps];
    } catch (error) {
        onFailure(error);
    }
}

function getTodaysStepsLocally(onSuccess = () => {}, onFailure = (data) => {console.log('Error getting setps', data)}) {
    try {
        // get steps

        let data = getLocally('stepsWalked') || [];

        let todaysSteps = {date: Date.now(), steps: 0};
        
        for(let item of data) {
            if (!(isToday(item.timestamp))) {
                continue;
            }

            todaysSteps.steps += item.steps;
        }

        onSuccess([todaysSteps]);

        // reset streak if needed
        let yesterdaysSteps = getYesterdaysStepsLocally()[0].steps;
        if (yesterdaysSteps < 10000) {
            resetStreakLocally();
        }

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