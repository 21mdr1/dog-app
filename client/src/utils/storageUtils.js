import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally, getTodaysStepsLocally, getStreakLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely, getTodaysStepsRemotely, getStreakRemotely } from './remoteStorageUtils';

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

// get streak

async function getStreak(userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        return await getStreakRemotely(onSuccess, onFailure)
    } else {
        return getStreakLocally(onSuccess, onFailure);
    }
}

// record preferences

async function recordPreferences(preferences, userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        await recordPreferencesRemotely(preferences, onSuccess, onFailure);
    } else {
        recordPreferencesLocally(preferences);
    }
}

export { recordSteps, recordPreferences, getLastWeeksSteps, getTodaysSteps, getStreak };