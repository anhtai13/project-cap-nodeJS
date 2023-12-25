export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

export const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.length > 9 && phoneNumber.length < 13
}

export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return passwordPattern.test(password) && password.length > 6 && password.length < 20
}

export const validateUserName = (userName) => {
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;

    return usernamePattern.test(userName) && userName.length > 1
}

export const validateIdUserDetails = (id) => {
    const idPattern = /^[0-9]+$/
    return idPattern.test(id)
}

export const validateRoleUser = (role) => {
    return typeof role === 'number'
}

