import { createUser, logUserIn } from "./remoteStorageUtils";
import { getPreferencesLocally, getAllStepsLocally, clearLocalCache, saveLocally, getStreakLocally } from "./localStorageUtils";
function userIsSignedIn() {
    return !!localStorage.getItem('token');
}

async function login(username, password, setSignedIn, onSuccess, onFailure) {
    let user = {username: username, password: password}

    await logUserIn(
        user,
        (data) => {
            saveLocally('token', data.token);
            setSignedIn(true);
            onSuccess && onSuccess(data);
        },
        onFailure
    );

}

function signOut(setSignedIn) {
    clearLocalCache('token');
    setSignedIn(false);
}

async function register(user, onSuccess, onFailure) {
    let preferences = getPreferencesLocally();
    let steps = getAllStepsLocally();
    let streak = getStreakLocally();

    let newUser = await createUser(
        user, 
        preferences, 
        steps,
        streak, 
        () => {
            clearLocalCache('preferences');
            clearLocalCache('stepsWalked');
            clearLocalCache('streak');
            onSuccess && onSuccess();
        },
        onFailure
    );

    return newUser;
}

export { userIsSignedIn, login, signOut, register };