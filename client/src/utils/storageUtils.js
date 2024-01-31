import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely } from './remoteStorageUtils';

// record steps

function recordSteps(steps, userIsSignedIn) {
    if (userIsSignedIn) {
        recordStepsRemotely(steps); 
    } else {
        recordStepsLocally(steps);
    }
}

// retrieve steps

function getLastWeeksSteps(userId, userIsSignedIn) {
    if (userIsSignedIn) {
        return getLastWeeksStepsRemotely(userId);
    } else {
        return getLastWeeksStepsLocally();
    }
}

// record preferences

function recordPreferences(preference, value, userId, userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        recordPreferencesRemotely(preference, value, userId, onSuccess, onFailure);
    } else {
        recordPreferencesLocally(preference, value);
    }
}

export { recordSteps, recordPreferences, getLastWeeksSteps };