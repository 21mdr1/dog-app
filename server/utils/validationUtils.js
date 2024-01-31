function emailIsValid(email) {
    return /^[\S]+[@][\S]+[.][\S]+$/.test(email);
}

function passwordIsValid(pass) {
    return (
        pass.length > 8 && 
        pass.match(/[A-Z]/) !== null &&
        pass.match(/[a-z]/) !== null &&
        pass.match(/[0-9]/) !== null &&
        pass.match(/[^A-Za-z0-9]/) !== null
    )
}

module.exports = {
    emailIsValid,
    passwordIsValid
}