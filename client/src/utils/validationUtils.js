import { checkUsername } from "./remoteStorageUtils";

function formIsValid(inputs) {
    for(let key in inputs) {
        if(!inputIsValid(key, inputs[key], inputs['password'])) {
            return false;
        }
    }
    return true;
}

async function getInputError(inputType, input, input2) {
    switch (inputType) {
        case 'email':
            return emailIsValid(input) ? null :
                "Email must be in the format yourname@example.com";
        case 'password':
            return passwordIsValid(input) ? null :
                'Password must be at least 8 characters long, contain a number, a special character, and a lowercase and uppercase letter';
        case 'confirmPassword':
            return passwordConfirmIsValid(input, input2) ? null :
                'Password confirmation must match password';
        case 'username':
            if(!input) {return 'This field is required'}
            return await usernameIsValid(input) ? null :
                'Username is already in use';
        default: 
            return defaultInputIsValid(input) ? null : 
                'This field is required'
    }
}

async function inputIsValid(inputType, input, input2) {
    switch (inputType) {
        case 'email':
            return emailIsValid(input);
        case 'password':
            return passwordIsValid(input);
        case 'confirmPassword':
            return passwordConfirmIsValid(input, input2);
        case 'username':
            return await usernameIsValid(input);
        default: 
            return defaultInputIsValid(input)
    }
}

function defaultInputIsValid(input) {
    return !(input === '');
}

function emailIsValid(email) {
    return /^[\S]+[@][\S]+[.][\S]+$/.test(email);
}

async function usernameIsValid(username) {
    if(!username) {
        return false;
    }
    let { exists } = await checkUsername(username, ()=>{});
    return !exists;
}

function passwordIsValid(pass) {
    if(pass.length >= 8 && 
        pass.match(/[A-Z]/) && 
        pass.match(/[a-z]/) &&
        pass.match(/[0-9]/) &&
        pass.match(/[^A-Za-z0-9]/)) {
        return true;
    }
    return false;
}

function passwordConfirmIsValid(confirmPass, pass) {
    return (confirmPass !== '' && confirmPass === pass);
}

export { formIsValid, inputIsValid, getInputError }; 