import { createUser, logUserIn, recordPreferencesRemotely, moveAllStepsToRemote } from "./remoteStorageUtils";
import { getPreferencesLocally, getAllStepsLocally, clearLocalCache, saveLocally, getLocally } from "./localStorageUtils";
function userIsSignedIn() {
    return !!localStorage.getItem('token');
}

async function login(username, password, setSignedIn) {
    let user = {username: username, password: password}

    let token = await logUserIn(
        user,
        (data) => {
            saveLocally('token', data.token)
            setSignedIn(true);
        });

}

function signOut(setSignedIn) {
    clearLocalCache('token');
    setSignedIn(false);
}

async function register(user) {
    let newUser = await createUser(user);

    let preferences = getPreferencesLocally();
    await recordPreferencesRemotely(preferences, newUser.user_id, () => {clearLocalCache('preferences')});

    let steps = getAllStepsLocally();
    await moveAllStepsToRemote(steps, newUser.user_id, () => {clearLocalCache('steps')});

    return newUser;
}

export { userIsSignedIn, login, signOut, register };