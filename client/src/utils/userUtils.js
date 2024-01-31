import { createUser } from "./remoteStorageUtils";

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
    // create user account
    createUser(user);
    // pass local preferences to remote

    // pass local steps to remote
}

export { userIsSignedIn, login, signOut, register };