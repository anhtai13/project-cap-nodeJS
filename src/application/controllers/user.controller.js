import userService from "../services/user.service.js"
const searchUsers = (req, res) => {
    const { name } = req.query;
    const sortName = req.query.sortUserName
    const sortRole = req.query.sortRole
    const sortLastName = req.query.sortLastName
    const limit = req.query.limit;
    const offset = req.query.offset;
    userService.searchUsers({ name, sortName, sortRole, sortLastName, limit, offset }, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const addUser = (req, res) => {
    const newUser = req.body;
    userService.addUser(newUser, (err, result) => {
        if (err) {
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            res.status(201).send("Success");
        }
    })
}

const getDetailUser = (req, res) => {
    const { id } = req.params;

    userService.getDetailUser({ id }, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(201).send({
                user: result
            });
        }
    })
}

const updateUser = (req, res) => {
    const userUpdate = req.body

    userService.updateUser(userUpdate, (err, result) => {
        if (err) {
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            res.status(202).send("Success");
        }
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params;

    userService.deleteUser({ id }, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(204).send("Success");
        }
    })
}

export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}