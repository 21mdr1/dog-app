import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally, getTodaysStepsLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely, getTodaysStepsRemotely } from './remoteStorageUtils';

// record steps

async function recordSteps(steps, userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        await recordStepsRemotely(steps, onSuccess, onFailure); 
    } else {
        recordStepsLocally(steps, onSuccess, onFailure);
    }
}

// retrieve steps

async function getLastWeeksSteps(userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        return await getLastWeeksStepsRemotely(onSuccess, onFailure);
    } else {
        return getLastWeeksStepsLocally(onSuccess, onFailure);
    }
}

async function getTodaysSteps(userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        return await getTodaysStepsRemotely(onSuccess, onFailure);
    } else {
        return getTodaysStepsLocally(onSuccess, onFailure);
    }
}

// record preferences

async function recordPreferences(preference, value, userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        await recordPreferencesRemotely(preference, value, onSuccess, onFailure);
    } else {
        recordPreferencesLocally(preference, value);
    }
}

export { recordSteps, recordPreferences, getLastWeeksSteps, getTodaysSteps };