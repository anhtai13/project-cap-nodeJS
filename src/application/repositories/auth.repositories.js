import getConnection from "../../config/connection.database.js";
import bcrypt from "bcryptjs";
import { randomString } from "../../utils/randomString.js";

// Lấy kết nối đến database từ module connection.database.js
const connection = getConnection();

// Hàm đăng nhập
const login = (params, callback) => {
  // Kiểm tra nếu vai trò là Admin (role = 1)
  if (params.role == 1) {
    // Truy vấn database để lấy thông tin Admin dựa trên tên đăng nhập
    connection.query(
      "SELECT * FROM users WHERE username = ? and role=1",
      [params.username],
      (error, results) => {
        console.log(results);
        if (error) {
          // Báo lỗi nếu có lỗi trong quá trình truy vấn
          callback({ message: "Something went wrong!" }, null);
          return;
        }
        // Kiểm tra nếu không tìm thấy Admin
        if (results.length === 0) {
          callback({ message: "Admin not found" }, null);
          return;
        }

        // So sánh mật khẩu được nhập với mật khẩu trong database sử dụng bcrypt
        bcrypt.compare(
          params.password,
          results[0].password,
          (err, passwordMatch) => {
            if (passwordMatch) {
              // Tạo một API key ngẫu nhiên và cập nhật vào database
              const key = `${results[0].user_id}` + randomString(125);
              connection.query(
                "UPDATE users SET api_key = ? WHERE user_id = ?",
                [key, results[0].user_id],
                (err, updateResults) => {
                  if (err) {
                    // Báo lỗi nếu có lỗi trong quá trình cập nhật
                    console.log(err);
                    callback({ message: "Something went wrong!" }, null);
                    return;
                  }
                  // Trả về API key nếu đăng nhập thành công
                  callback(null, key);
                }
              );
            }
          }
        );
      }
    );
  }

  // Kiểm tra nếu vai trò là User (role = 2)
  if (params.role == 2) {
    // Truy vấn database để lấy thông tin User dựa trên tên đăng nhập
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [params.username],
      (error, results) => {
        if (error) {
          // Báo lỗi nếu có lỗi trong quá trình truy vấn
          callback({ message: "Something went wrong!" }, null);
          return;
        }
        // Kiểm tra nếu không tìm thấy User
        if (results.length === 0) {
          callback({ message: "User not found" }, null);
          return;
        }

        // So sánh mật khẩu được nhập với mật khẩu trong database sử dụng bcrypt
        bcrypt.compare(
          params.password,
          results[0].password,
          (err, passwordMatch) => {
            if (passwordMatch) {
              // Tạo một API key ngẫu nhiên và cập nhật vào database
              const key = `${results[0].id}` + randomString(125);
              connection.query(
                "UPDATE users SET api_key = ? WHERE id = ?",
                [key, results[0].id],
                (err, updateResults) => {
                  if (err) {
                    // Báo lỗi nếu có lỗi trong quá trình cập nhật
                    callback({ message: "Something went wrong!" }, null);
                    return;
                  }
                  // Trả về thông tin (key và id) nếu đăng nhập thành công
                  callback(null, { key: key, id: results[0].id });
                }
              );
            }
          }
        );
      }
    );
  }
};

// Hàm đăng xuất
const logout = (params, callback) => {
  // Cập nhật API key trong database thành null khi người dùng đăng xuất
  connection.query(
    "UPDATE users SET api_key = null WHERE api_key = ?",
    [params.key],
    (error, results) => {
      if (error) {
        // Báo lỗi nếu có lỗi trong quá trình cập nhật
        callback({ message: "Something went wrong!" }, null);
      } else {
        // Trả về thông báo thành công nếu đăng xuất thành công
        callback(null, "See you again!");
      }
    }
  );
};

// Export các hàm như một module
export default {
  login,
  logout,
};
