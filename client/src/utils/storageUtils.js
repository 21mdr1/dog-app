import axios from axios;

// Local Storage Utils

function saveLocally(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocally(key) {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return []; //what about preferences
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
    if (userIsSignedIn) {
        //recordStepsRemotely(steps); 
    } else {
        recordStepsLocally(steps);
    }
}

function recordStepsLocally(steps) {
    let data = getLocally('stepsWalked');
    data.append(steps);
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
    if (userIsSignedIn) {
        //return lastWeeksStepsRemotely();
    } else {
        return lastWeeksStepsLocally();
    }
}

function lastWeeksStepsLocally() {
    // save by IP instead of using localStorage?
    // add up last week's steps
    return localStorage.getItem('timestamp');
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

