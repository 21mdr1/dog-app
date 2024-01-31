import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

// Helpers

function defaultAction(data) {
    console.log(data)
}

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

async function getLastWeeksStepsRemotely(userId, onSuccess, onFailure = (error) => {console.log('Error getting steps:', error)}) {

    let data = getFromDB(
        `${BASE_URL}/steps/${userId}`, 
        onSuccess, 
        onFailure
    );

    return data;
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

async function createUser(user) {
    try {
        let response = await axios.post(`${BASE_URL}/user/register`, user);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely, createUser };