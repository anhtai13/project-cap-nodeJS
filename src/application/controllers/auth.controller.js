import authService from "../services/auth.service.js";

// Hàm xử lý yêu cầu đăng nhập
const login = (req, res) => {
  // Lấy thông tin đăng nhập từ body của request
  const userLogin = req.body;

  // Gọi hàm đăng nhập từ module 'authService'
  authService.login(userLogin, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ authService
    if (err) {
      // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      // Trả về mã thành công 200 và kết quả đăng nhập nếu không có lỗi
      res.status(200).send(result);
    }
  });
};

// Hàm xử lý yêu cầu đăng xuất
const logout = (req, res) => {
  // Lấy thông tin đăng xuất từ body của request
  const userLogout = req.body;

  // Gọi hàm đăng xuất từ module 'authService'
  authService.logout(userLogout, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ authService
    if (err) {
      // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      // Trả về mã thành công 200 và thông báo đăng xuất nếu không có lỗi
      res.status(200).send(result);
    }
  });
};

// Export các hàm như một module
export default {
  login,
  logout,
};
