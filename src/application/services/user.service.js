import { validateEmail, validateIdUserDetails, validatePassword, validateRoleUser, validateUserName } from "../../utils/validationUser.js";
import userRepositories from "./../repositories/user.repositories.js";

// Hàm tìm kiếm người dùng
const searchUsers = (params, callback) => {
    userRepositories.searchUsers(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Hàm thêm người dùng mới
const addUser = (params, callback) => {
    if (!params.username && !params.password && !params.email && !params.first_name && !params.last_name) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    }
    else if (!validateEmail(params.email)) {
        callback({ message: "Email không hợp lệ!" }, null);
    } else if (!validatePassword(params.password)) {
        callback({ message: "Mật khẩu không hợp lệ!" }, null);
    } else if (!validateUserName(params.username)) {
        callback({ message: "Tên người dùng không hợp lệ!" }, null);
    } else if (!validateRoleUser(params.role)) {
        callback({ message: "Vai trò không hợp lệ!" }, null);
    } else {
        userRepositories.addUser(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

// Hàm lấy chi tiết người dùng
const getDetailUser = (params, callback) => {
    if (!validateIdUserDetails(params.id)) {
        callback({ message: "ID không hợp lệ!" }, null);
    } else {
        userRepositories.getDetailUser(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

// Hàm cập nhật thông tin người dùng
const updateUser = (params, callback) => {
    if (!params.username && !params.password && !params.email && !params.first_name && !params.last_name) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    }
    else if (!validateEmail(params.email)) {
        callback({ data: "email", message: "Email không hợp lệ!" }, null);
    } else if (!validateUserName(params.username)) {
        callback({ data: "username", message: "Tên người dùng không hợp lệ!" }, null);
    } else {
        userRepositories.updateUser(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

// Hàm xóa người dùng
const deleteUser = (params, callback) => {
    if (!validateIdUserDetails(params.id)) {
        callback({ message: "ID không hợp lệ" }, null);
    } else {
        userRepositories.deleteUser(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
};
