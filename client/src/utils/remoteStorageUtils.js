import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

// Helpers

function defaultAction(data) {
    console.log(data)
}

async function saveInDB(data, endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.post(endpoint, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

async function getFromDB(endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

async function changeInDB(data, endpoint, onSuccess = defaultAction, onFailure = defaultAction) {
    try {
        let response = await axios.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        onSuccess(response.data);
        return response.data;

    } catch(error) {
        onFailure(error);
    }
}

// Actions

async function recordStepsRemotely(steps, onSuccess, onFailure = (error) => {console.log('Error saving steps:', error)}) {
    let data = saveInDB(
        steps, 
        `${BASE_URL}/steps`, 
        onSuccess, 
        onFailure
    );

    return data;
}

async function getLastWeeksStepsRemotely(onSuccess, onFailure = (error) => {console.log('Error getting steps:', error)}) {

    let data = getFromDB(
        `${BASE_URL}/steps`, 
        onSuccess, 
        onFailure
    );

    return data;
}

// this will be changed back to be record
async function recordPreferencesRemotely(preference, value, onSuccess, onFailure = (error) => {console.log('Error recording preferences', error)}) {
    let data = await changeInDB(
        {preference: preference, value: value}, 
        `${BASE_URL}/preferences`,
        onSuccess,
        onFailure
    );
    
    return data;
}

async function createUser(user, preferences, steps, onSuccess, onFailure = (error) => {console.log('Error creating user', error)}) {
    let data = await saveInDB(
        { 
            user: user,
            preferences: preferences,
            steps: steps,
        },
        `${BASE_URL}/user/register`, 
        onSuccess, 
        onFailure
    );

    return data;
}

async function logUserIn(user, onSuccess, onFailure = (error) => {console.log('Error creating user', error)}) {
    let data = await saveInDB(
        user,
        `${BASE_URL}/user/login`, 
        onSuccess, 
        onFailure
    );

    return data;
}

export { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely, createUser, logUserIn };