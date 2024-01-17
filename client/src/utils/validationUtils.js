
function formIsValid(inputs, returnErrors = false) {
    for(let key in inputs) {
        let errors = inputIsValid(key, inputs[key], inputs['password'], true);
        if(errors.length) {
            return returnErrors ? errors : false;
        }
    }

    return returnErrors ? [] : true;
}

function inputIsValid(inputType, input, input2, returnErrors = false) {
    let errors;
    switch (inputType) {
        case 'email':
            errors = emailIsValid(input);
            break;
        case 'password':
            errors = passwordIsValid(input);
            break;
        case 'confirmPassword':
            errors = passwordConfirmIsValid(input, input2);
            break;
        default: 
            errors = (input.length > 0) ? [] : [`${inputType} must not be empty`];
            break;
    }
    return returnErrors ? errors : !errors.length; 
}

function emailIsValid(email) {
    return /^[\S]+[@][\S]+[.][\S]+$/.test(email) ? [] : ['Email is invalid'];
}

function passwordIsValid(pass) {
    let error = [];
    if(pass.length < 8) {
        error.push('Password must be at least 8 characters long');
    }

    if (pass.match(/[A-Z]/) === null) {
        error.push('Password must contain an uppercase letter');
    }

    if (pass.match(/[a-z]/) === null) {
        error.push('Password must contain a lowercase letter');
    }

    if (pass.match(/[0-9]/) === null) {
        error.push('Password must contain a number');
    }

    if (pass.match(/[\W\D\S]/) === null) {
        error.push('Password must contain a special character');
    }

    return error;
}

function passwordConfirmIsValid(confirmPass, pass) {
    return (confirmPass === pass) ? [] : ['Password confirmation must match password'];
}

export { formIsValid, inputIsValid }; 