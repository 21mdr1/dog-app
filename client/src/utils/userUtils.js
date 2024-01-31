import { createUser, recordPreferencesRemotely, moveAllStepsToRemote } from "./remoteStorageUtils";
import { getPreferencesLocally, getAllStepsLocally } from "./localStorageUtils";

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
    recordPreferencesRemotely(preferences, newUser.user_id);

    let steps = getAllStepsLocally();
    moveAllStepsToRemote(steps, newUser.user_id);

    return newUser;
}

export { userIsSignedIn, login, signOut, register };