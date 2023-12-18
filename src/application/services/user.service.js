// Import các hàm kiểm tra tính hợp lệ từ module 'validationUser.js'
import {
  validateEmail,
  validateIdUserDetails,
  validatePassword,
  validateRoleUser,
  validateUserName,
} from "../../utils/validationUser.js";

// Import các hàm thao tác cơ sở dữ liệu từ module 'user.repositories.js'
import userRepositories from "./../repositories/user.repositories.js";

// Hàm tìm kiếm người dùng
const searchUsers = (params, callback) => {
  // Gọi hàm tìm kiếm người dùng từ module 'userRepositories'
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
  // Kiểm tra và xử lý tính hợp lệ của các tham số đầu vào
  if (
    !params.username &&
    !params.password &&
    !params.email &&
    !params.first_name &&
    !params.last_name
  ) {
    callback({ message: "Vui lòng điền đầy đủ thông tin" }, null);
  } else if (!validateEmail(params.email)) {
    callback({ message: "Email không hợp lệ!" }, null);
  } else if (!validatePassword(params.password)) {
    callback({ message: "Mật khẩu không hợp lệ!" }, null);
  } else if (!validateUserName(params.username)) {
    callback({ message: "Tên người dùng không hợp lệ!" }, null);
  } else if (!validateRoleUser(params.role)) {
    callback({ message: "Vai trò không hợp lệ!" }, null);
  } else {
    // Gọi hàm thêm người dùng từ module 'userRepositories'
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
  // Kiểm tra và xử lý tính hợp lệ của ID người dùng
  if (!validateIdUserDetails(params.id)) {
    callback({ message: "ID không hợp lệ!" }, null);
  } else {
    // Gọi hàm lấy chi tiết người dùng từ module 'userRepositories'
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
  // Kiểm tra và xử lý tính hợp lệ của các tham số đầu vào
  if (
    !params.username &&
    !params.password &&
    !params.email &&
    !params.first_name &&
    !params.last_name
  ) {
    callback({ message: "Vui lòng điền đầy đủ thông tin" }, null);
  } else if (!validateEmail(params.email)) {
    callback({ data: "email", message: "Email không hợp lệ!" }, null);
  } else if (!validateUserName(params.username)) {
    callback(
      { data: "username", message: "Tên người dùng không hợp lệ!" },
      null
    );
  } else {
    // Gọi hàm cập nhật người dùng từ module 'userRepositories'
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
  // Kiểm tra và xử lý tính hợp lệ của ID người dùng
  if (!validateIdUserDetails(params.id)) {
    callback({ message: "ID không hợp lệ" }, null);
  } else {
    // Gọi hàm xóa người dùng từ module 'userRepositories'
    userRepositories.deleteUser(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

// Xuất các hàm như một module
export default {
  searchUsers,
  addUser,
  getDetailUser,
  updateUser,
  deleteUser,
};
