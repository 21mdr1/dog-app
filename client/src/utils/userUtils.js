import { createUser, recordPreferencesRemotely, moveAllStepsToRemote } from "./remoteStorageUtils";
import { getPreferencesLocally, getAllStepsLocally, clearLocalCache } from "./localStorageUtils";

function userIsSignedIn() {
    return !!localStorage.getItem('username');
}

function login(username) {
    localStorage.setItem('username', username);
}

function signOut() {
    localStorage.removeItem('username');
}

async function register(user) {
    let newUser = await createUser(user);
    console.log(newUser);

    let preferences = getPreferencesLocally();
    await recordPreferencesRemotely(preferences, newUser.user_id, () => {clearLocalCache('preferences')});

    let steps = getAllStepsLocally();
    await moveAllStepsToRemote(steps, newUser.user_id, () => {clearLocalCache('steps')});

    return newUser;
}

export { userIsSignedIn, login, signOut, register };