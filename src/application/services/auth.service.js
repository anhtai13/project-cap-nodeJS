import authRepositories from "../repositories/auth.repositories.js";

// Hàm xử lý yêu cầu đăng nhập
const login = (params, callback) => {
  // Gọi hàm đăng nhập từ module 'authRepositories'
  authRepositories.login(params, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ authRepositories
    if (err) {
      // Gọi hàm callback để trả về thông báo lỗi nếu có lỗi
      callback(err, null);
    } else {
      // Gọi hàm callback để trả về kết quả đăng nhập nếu không có lỗi
      callback(null, result);
    }
  });
};

// Hàm xử lý yêu cầu đăng xuất
const logout = (params, callback) => {
  // Gọi hàm đăng xuất từ module 'authRepositories'
  authRepositories.logout(params, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ authRepositories
    if (err) {
      // Gọi hàm callback để trả về thông báo lỗi nếu có lỗi
      callback(err, null);
    } else {
      // Gọi hàm callback để trả về kết quả đăng xuất nếu không có lỗi
      callback(null, result);
    }
  });
};

// Export các hàm như một module
export default {
  login,
  logout,
};
