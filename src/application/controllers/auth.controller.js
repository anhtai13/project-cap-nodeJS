import authService from "../services/auth.service.js"

const login = (req, res) => {
    const userLogin = req.body
    authService.login(userLogin, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const logout = (req, res) => {
    const userLogout = req.body
    authService.logout(userLogout, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

export default {
    login,
    logout
}