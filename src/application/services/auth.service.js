import authRepositories from "../repositories/auth.repositories.js"

const login = (params, callback) => {
    authRepositories.login(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

const logout = (params, callback) => {
    authRepositories.logout(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

export default {
    login,
    logout
}