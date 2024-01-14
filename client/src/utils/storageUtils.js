import axios from 'axios';
import { getWeekday, isInLastWeek } from "./dateUtils";

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

// async function saveInDB(data) {
//     try {
//         let response = await axios.post();

//         return response.data;
//     } catch(err) {
//         console.log('Error saving data');
//     }
// }

// record steps

function recordSteps(steps) {
    // if (userIsSignedIn) {
    //     //recordStepsRemotely(steps); 
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

// async function recordStepsRemotely(steps) {
//     try {
//         let response = await axios.post(url, {timestamp: timestamp, steps: steps});
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


// retrieve steps

function getLastWeeksSteps() {
    //if (userIsSignedIn) {
        //return lastWeeksStepsRemotely();
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

function recordPreferences(preference, value) {
    recordPreferencesLocally(preference, value);
}

// async function lastWeeksStepsRemotely() {
//     try {
//         let response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


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