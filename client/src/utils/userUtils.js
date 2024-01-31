import { createUser, recordPreferencesRemotely } from "./remoteStorageUtils";
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

function register(user) {
    let newUser = createUser(user);

    let preferences = getPreferencesLocally();
    recordPreferencesRemotely(preferences, newUser.user_id);

    // pass local steps to remote
    let steps = getAllStepsLocally();

}

export { userIsSignedIn, login, signOut, register };