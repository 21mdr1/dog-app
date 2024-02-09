import { recordStepsLocally, getLastWeeksStepsLocally, recordPreferencesLocally, getTodaysStepsLocally, getStreakLocally, getPreferencesLocally } from './localStorageUtils';
import { recordStepsRemotely, getLastWeeksStepsRemotely, recordPreferencesRemotely, getTodaysStepsRemotely, getStreakRemotely, getPreferencesRemotely } from './remoteStorageUtils';
import { getLast7Days } from './dateUtils';

// data utils

function fillInDataGaps(data) {
    let fullDays = getLast7Days();

    for(let item of data) {
        for(let day of fullDays) {
            if(item.formatted_date === day.formatted_date) {
                day.steps = item.steps;
                break;
            }
        }
    }

    return fullDays.toReversed();
}

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
    let steps;

    if (userIsSignedIn) {
        steps = await getLastWeeksStepsRemotely((data) => onSuccess(fillInDataGaps(data)), onFailure);
    } else {
        steps = getLastWeeksStepsLocally((data) => onSuccess(fillInDataGaps(data)), onFailure);
    }

    return fillInDataGaps(steps);
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
        recordPreferencesLocally(preferences, onSuccess, onFailure);
    }
}

// get preferences

async function getPreferences(userIsSignedIn, onSuccess, onFailure) {
    if (userIsSignedIn) {
        await getPreferencesRemotely(onSuccess, onFailure);
    } else {
        getPreferencesLocally(onSuccess, onFailure);
    }
}

export { recordSteps, recordPreferences, getPreferences, getLastWeeksSteps, getTodaysSteps, getStreak };