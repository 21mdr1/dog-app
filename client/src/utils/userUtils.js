
function userIsSignedIn() {
    return !!localStorage.getItem('username');
}

function login(username) {
    localStorage.setItem('username', username);
}

function signOut() {
    localStorage.removeItem('username');
}

function register() {

}