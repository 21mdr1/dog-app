import { createUser, logUserIn } from "./remoteStorageUtils";
import { getPreferencesLocally, getAllStepsLocally, clearLocalCache, saveLocally } from "./localStorageUtils";
function userIsSignedIn() {
    return !!localStorage.getItem('token');
}

async function login(username, password, setSignedIn) {
    let user = {username: username, password: password}

    await logUserIn(
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
    let preferences = getPreferencesLocally();
    let steps = getAllStepsLocally();

    let newUser = await createUser(
        user, 
        preferences, 
        steps, 
        () => {
            clearLocalCache('preferences')
            clearLocalCache('steps')
        }
    );

    return newUser;
}

export { userIsSignedIn, login, signOut, register };