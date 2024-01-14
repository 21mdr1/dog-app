import axios from axios;

function saveInLocalStorage(data) {
    localStorage.setItem(data.key, data.value);
}

async function saveInDB(data) {
    try {
        let response = await axios.post();

        return response.data;
    } catch(err) {
        console.log('Error saving data');
    }
}

function recordSteps(steps) {
    if (userIsSignedIn) {
        recordStepsLocally(steps);
    } else {
        recordStepsRemotely(steps);
    }
}

function recordStepsLocally(steps) {
    localStorage.setItem({timestamp: timestamp, steps: steps});
}

async function recordStepsRemotely(steps) {
    try {
        let response = await axios.post(url, {timestamp: timestamp, steps: steps});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


function lastWeeksSteps() {
    if (userIsSignedIn) {
        return lastWeeksStepsLocally();
    } else {
        return lastWeeksStepsRemotely();
    }
}

function lastWeeksStepsLocally() {
    // save by IP instead of using localStorage?
    // add up last week's steps
    return localStorage.getItem('timestamp');
}

async function lastWeeksStepsRemotely() {
    try {
        let response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function createUser(user) {
    try {
        let response = await axios.post(url, user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



// maybe save users by IP before getting an acount

// -> user utils <-
// login user
// sign out user
// register user
// user is logged in