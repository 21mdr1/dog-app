import axios from 'axios';
import { getWeekday, isInLastWeek } from "./dateUtils";

const BASE_URL = process.env.REACT_APP_API_URL;

// defaults

function defaultAction(data) {
    console.log(data)
}

// Local Storage Utils

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

// Remote Storage Utils

async function saveInDB(data, endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.post(endpoint, data);
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

async function getFromDB(endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.get(endpoint);
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

async function changeInDB(data, endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.put(endpoint, data);
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

// record steps

function recordSteps(steps) {
    // if (userIsSignedIn) {
    //     recordStepsRemotely(steps); 
    // } else {
        recordStepsLocally(steps);
    //}
}

function recordStepsLocally(steps) {
    steps.timestamp = Date.now();

    let data = getLocally('stepsWalked') || [];
    data = purgeOldLocalSteps(data);
    data.push(steps);

    saveLocally('stepsWalked', data);
}

async function recordStepsRemotely(steps, onSuccess, onFailure = (error) => {console.log('Error saving steps:', error)}) {
    let data = saveInDB(
        steps, 
        `${BASE_URL}/steps`, 
        onSuccess, 
        onFailure
    );

    return data;
}


// retrieve steps

function getLastWeeksSteps(userId) {
    //if (userIsSignedIn) {
        //return lastWeeksStepsRemotely(userId);
    //} else {
        return getLastWeeksStepsLocally();
    //}
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

async function getLastWeeksStepsRemotely(userId, onSuccess, onFailure = (error) => {console.log('Error getting steps:', error)}) {

    let data = getFromDB(
        `${BASE_URL}/steps/${userId}`, 
        onSuccess, 
        onFailure
    );

    return data;
}

// record preferences

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

async function recordPreferencesRemotely(preference, value, userId, onSuccess, onFailure = (error) => {console.log('Error recording preferences', error)}) {
    let data = await changeInDB(
        {preference: preference, value: value, userId: userId}, 
        `${BASE_URL}/preferences`,
        onSuccess,
        onFailure
    );
    
    return data;
}

function recordPreferences(preference, value, userId, onSuccess, onFailure) {
    recordPreferencesLocally(preference, value);
    //recordPreferencesRemotely(preference, value, userId, onSuccess, onFailure);
}


// create user

// async function createUser(user) {
//     try {
//         let response = await axios.post(url, user);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


// transfer local data to remote



export { recordSteps, recordPreferences, getLastWeeksSteps };