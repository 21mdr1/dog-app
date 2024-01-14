import axios from 'axios';
import { getLast7Days } from "./dateUtils";

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
    let data = getLocally('stepsWalked') || [];

    steps.timestamp = Date.now();
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

function lastWeeksSteps() {
    //if (userIsSignedIn) {
        //return lastWeeksStepsRemotely();
    //} else {
        return lastWeeksStepsLocally();
    //}
}

function lastWeeksStepsLocally() {
    let data = localStorage.getItem('stepsWalked');
    // add up last week's steps
    let last7Days = [];
    for(let item of data) {
        let date = item.date; // turn to date not timestamp
        let added = false;
        for(let day of last7Days) {
            if (date === day.date) {
                day.steps += item.steps;
                added = true;
                break;
            }
            if(!added) {
                last7Days.append(day);
            }
        }
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



export { recordSteps, recordPreferences, lastWeeksSteps };