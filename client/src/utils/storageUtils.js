import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely } from './remoteStorageUtils';

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

// record preferences

async function recordPreferences(preference, value, userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        await recordPreferencesRemotely(preference, value, onSuccess, onFailure);
    } else {
        recordPreferencesLocally(preference, value);
    }
}

export { recordSteps, recordPreferences, getLastWeeksSteps };