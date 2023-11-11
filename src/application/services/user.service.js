import userRepository from "./../repositories/user.repository.js";
import fs from "fs";
import { getFileExtension } from "../../utilities/upload.util.js";

const searchUsers = (params, callback) => {
    // Kiểm tra nếu có tham số "limit" và "limit" không phải là số
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit phải là số" }, null);
    }
    // Kiểm tra nếu có tham số "page" và "page" không phải là số
    else if (params.page && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page phải là số" }, null);
    } else {
        // Nếu không có lỗi về limit và page, gọi hàm tìm kiếm người dùng từ repository
        userRepository.searchUsers(params, (error, result) => {
            if (error) {
                // Nếu có lỗi trong quá trình tìm kiếm, gọi lại hàm callback với thông báo lỗi
                callback(error, null);
            } else {
                // Nếu tìm kiếm thành công, gọi lại hàm callback với kết quả tìm kiếm
                callback(null, result);
            }
        });
    }
};

const viewAddUser = (params, callback) => {};

const addUser = (requestBody, callback) => {
    let originalname = null;
    let path = null;

    // Kiểm tra nếu có dữ liệu ảnh đại diện ("avatar") được gửi kèm
    if (requestBody.avatar) {
        originalname = requestBody.avatar.originalname;
        path = requestBody.avatar.path;
    }

    // Hàm validate dữ liệu người dùng
    const validate = (params) => {
        let errors = new Map();

        // Validate username
        if (!params.username) {
            errors.set("username", "Tên đăng nhập không được bỏ trống.");
        } else if (typeof params.username !== "string") {
            errors.set("username", "Tên đăng nhập phải là chuỗi.");
        } else if (params.username.length < 4 || params.username.length > 10) {
            errors.set(
                "username",
                "Tên đăng nhập chỉ cho phép 4 đến 10 ký tự."
            );
        }

        // Validate email
        if (!params.email) {
            errors.set("email", "Email không được bỏ trống.");
        } else if (typeof params.email !== "string") {
            errors.set("email", "Email phải là chuỗi.");
        } else if (params.email.length < 4 || params.email.length > 50) {
            errors.set("email", "Email chỉ cho phép 4 đến 50 ký tự.");
        }

        // Validate first name
        if (typeof params.first_name !== "string") {
            errors.set("first_name", "Họ phải là chuỗi.");
        } else if (params.first_name && params.first_name.length > 50) {
            errors.set("first_name", "Họ chỉ cho phép dưới 50 ký tự.");
        }

        // Validate last name
        if (typeof params.last_name !== "string") {
            errors.set("last_name", "Tên phải là chuỗi.");
        } else if (params.first_name && params.first_name.length > 50) {
            errors.set("last_name", "Tên chỉ cho phép dưới 50 ký tự.");
        }

        // Validate password
        if (!params.password) {
            errors.set("password", "Password không được bỏ trống.");
        } else if (typeof params.password !== "string") {
            errors.set("password", "Mật khẩu phải là chuỗi.");
        } else if (params.password < 8 || params.password.length > 20) {
            errors.set("password", "Mật khẩu chỉ cho phép từ 8 đến 20 ký tự.");
        }

        if (typeof params.role !== "string") {
            errors.set("role", "Vai trò phải là chuỗi.");
        } else if (params.role !== "1" && params.role !== "2") {
            errors.set("role", "Vai trò chỉ cho phép nhập 1 hoặc 2.");
        }

        return errors;
    };

    // Thực hiện xác thực thông tin người dùng
    const validateErrors = validate(requestBody);

    // Nếu có lỗi trong quá trình xác thực, gọi lại hàm callback với các lỗi được trả về
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let avatar = null;

        // Nếu có lỗi trong quá trình xác thực, gọi lại hàm callback với các lỗi được trả về
        if (requestBody.avatar) {
            const avatarExtension = getFileExtension(originalname);
            avatar = `avatar/${requestBody.username}.${avatarExtension}`;
            const avatarLocation = `./public/${avatar}`;

            // Copy uploaded file to saving location
            fs.cpSync(path, avatarLocation);
        }

        // Tạo đối tượng mới người dùng để lưu vào cơ sở dữ liệu
        const newUser = {
            username: requestBody.username,
            email: requestBody.email,
            first_name: requestBody.first_name,
            last_name: requestBody.last_name,
            password: requestBody.password,
            role: requestBody.role,
            avatar: avatar,
            created_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,
        };

        // Gọi repository để thêm người dùng mới vào cơ sở dữ liệu
        userRepository.addUser(newUser, (error, result) => {
            // Sau khi thêm, xóa tệp ảnh tạm thời (nếu có)
            if (path) {
                fs.rmSync(path);
            }
            // Kiểm tra nếu có lỗi trong quá trình thêm người dùng, gọi lại hàm callback với lỗi tương ứng
            if (error) {
                callback(error, null);
            } else {
                // Nếu thành công, gọi lại hàm callback với kết quả
                callback(null, result);
            }
        });
    }
};

const getDetailUser = (id, callback) => {
    // Kiểm tra xem `id` có phải là số hay không
    // if (!/^[0-9]+$/.test(id)) {
    // Nếu `id` không phải là số, gọi lại hàm callback với thông báo lỗi
    // callback({ message: "ID phải là số" }, null);
    // } else
    {
        // Nếu `id` là số, gọi hàm `userRepository.getDetailUser` để lấy thông tin người dùng dựa trên `id`
        userRepository.getDetailUser(id, (error, result) => {
            if (error) {
                // Nếu có lỗi trong quá trình truy vấn cơ sở dữ liệu, gọi lại hàm callback với thông báo lỗi tương ứng
                callback(error, null);
            } else if (result.length === 0) {
                // Nếu không tìm thấy người dùng với `id` đã cung cấp, gọi lại hàm callback với thông báo lỗi "User not found"
                callback({ message: "User not found" }, null);
            } else {
                // Nếu tìm thấy người dùng, gọi lại hàm callback với thông tin chi tiết của người dùng (nằm trong mảng `result` với chỉ một phần tử)
                callback(null, result[0]);
            }
        });
    }
};

const updateUser = (userId, requestBody, callback) => {
    let originalname = null;
    let path = null;

    // Kiểm tra nếu có dữ liệu ảnh đại diện ("avatar") được gửi kèm
    if (requestBody.avatar) {
        originalname = requestBody.avatar.originalname;
        path = requestBody.avatar.path;
    }

    // Thực hiện việc xác thực thông tin người dùng
    const validate = (params) => {
        let errors = new Map();

        // Validate first name
        if (typeof params.first_name !== "string") {
            errors.set("first_name", "Họ phải là chuỗi.");
        } else if (params.first_name && params.first_name.length > 50) {
            errors.set("first_name", "Họ chỉ cho phép dưới 50 ký tự.");
        }

        // Validate last name
        if (typeof params.last_name !== "string") {
            errors.set("last_name", "Tên phải là chuỗi.");
        } else if (params.first_name && params.first_name.length > 50) {
            errors.set("last_name", "Tên chỉ cho phép dưới 50 ký tự.");
        }

        // Validate password
        if (params.password) {
            if (typeof params.password !== "string") {
                errors.set("password", "Mật khẩu phải là chuỗi.");
            } else if (params.password < 8 || params.password.length > 20) {
                errors.set(
                    "password",
                    "Mật khẩu chỉ cho phép từ 8 đến 20 ký tự."
                );
            }
        }

        if (typeof params.role !== "string") {
            errors.set("role", "Vai trò phải là chuỗi.");
        } else if (params.role !== "1" && params.role !== "2") {
            errors.set("role", "Vai trò chỉ cho phép nhập 1 hoặc 2.");
        }

        return errors;
    };

    // Thực hiện xác thực thông tin người dùng
    const validateErrors = validate(requestBody);

    // Nếu có lỗi trong quá trình xác thực, gọi lại hàm callback với các lỗi được trả về
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let avatar = null;

        // Kiểm tra xem có dữ liệu ảnh đại diện được gửi kèm không
        if (requestBody.avatar) {
            const avatarExtension = getFileExtension(originalname);
            avatar = `avatar/${requestBody.username}.${avatarExtension}`;
            const avatarLocation = `./public/${avatar}`;

            // Copy upload file to saving location
            fs.cpSync(path, avatarLocation);
        }

        // Tạo đối tượng mới để cập nhật thông tin người dùng
        const updateUser = {
            username: requestBody.username,
            email: requestBody.email,
            first_name: requestBody.first_name,
            last_name: requestBody.last_name,
            password: requestBody.password,
            role: requestBody.role,
            avatar: avatar,
            updated_by: requestBody.authId,
        };

        // Gọi repository để cập nhật thông tin người dùng
        userRepository.updateUser(userId, updateUser, (error, result) => {
            // Sau khi cập nhật, xóa tệp ảnh tạm thời (nếu có)
            if (path) {
                fs.rmSync(path);
            }
            // Kiểm tra nếu có lỗi trong quá trình cập nhật, gọi lại hàm callback với thông báo lỗi tương ứng
            if (error) {
                callback(error, null);
            } else {
                // Nếu thành công, gọi lại hàm callback với kết quả của quá trình cập nhật
                callback(null, result);
            }
        });
    }
};

const deleteUser = (id, callback) => {
    // Kiểm tra xem `id` có phải là số hay không
    if (!/^[0-9]+$/.test(id)) {
        // Nếu `id` không phải là số, gọi lại hàm callback với thông báo lỗi
        callback({ message: "ID phải là số" }, null);
    } else {
        // Nếu `id` là số, gọi hàm `userRepository.deleteUser` để xóa người dùng dựa trên `id`
        userRepository.deleteUser(id, (error, result) => {
            if (error) {
                // Nếu có lỗi trong quá trình xóa, gọi lại hàm callback với thông báo lỗi tương ứng
                callback(error, null);
            } else if (result.affectedRows === 0) {
                // Nếu không tìm thấy người dùng với `id` đã cung cấp, gọi lại hàm callback với thông báo lỗi "User not found"
                callback({ message: "User not found" }, null);
            } else {
                // Nếu xóa thành công, hàm callback sẽ được gọi lại với kết quả của quá trình xóa
                callback(null, result);
            }
        });
    }
};

export default {
    searchUsers,
    viewAddUser,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser,
};
