import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely } from './remoteStorageUtils';

// record steps

function recordSteps(steps) {
    // if (userIsSignedIn) {
    //     recordStepsRemotely(steps); 
    // } else {
        recordStepsLocally(steps);
    //}
}

// retrieve steps

function getLastWeeksSteps(userId) {
    //if (userIsSignedIn) {
        //return lastWeeksStepsRemotely(userId);
    //} else {
        return getLastWeeksStepsLocally();
    //}
}

// record preferences

function recordPreferences(preference, value, userId, onSuccess, onFailure) {
    recordPreferencesLocally(preference, value);
    //recordPreferencesRemotely(preference, value, userId, onSuccess, onFailure);
}

// transfer local data to remote



export { recordSteps, recordPreferences, getLastWeeksSteps };