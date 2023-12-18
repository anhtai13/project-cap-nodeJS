import userService from "../services/user.service.js";

// Hàm tìm kiếm người dùng
const searchUsers = (req, res) => {
  // Lấy các tham số từ query parameters của request
  const { name } = req.query;
  const sortName = req.query.sortUserName;
  const sortRole = req.query.sortRole;
  const sortLastName = req.query.sortLastName;
  const limit = req.query.limit;
  const offset = req.query.offset;

  // Gọi hàm tìm kiếm người dùng từ module 'userService'
  userService.searchUsers(
    { name, sortName, sortRole, sortLastName, limit, offset },
    (err, result) => {
      // Xử lý kết quả hoặc lỗi từ userService
      if (err) {
        // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi
        res.status(500).send({
          errMessage: err.message,
        });
      } else {
        // Trả về mã thành công 200 và kết quả tìm kiếm nếu không có lỗi
        res.status(200).send(result);
      }
    }
  );
};

// Hàm thêm người dùng mới
const addUser = (req, res) => {
  // Lấy đối tượng người dùng mới từ body của request
  const newUser = req.body;

  // Gọi hàm thêm người dùng từ module 'userService'
  userService.addUser(newUser, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ userService
    if (err) {
      // Trả về mã lỗi 500, thông báo lỗi và thông tin lỗi chi tiết nếu có
      res.status(500).send({
        errData: err.data,
        error: err.message,
      });
    } else {
      // Trả về mã thành công 201 nếu không có lỗi
      res.status(201).send("Success");
    }
  });
};

// Hàm lấy chi tiết người dùng
const getDetailUser = (req, res) => {
  // Lấy ID người dùng từ parameters của request
  const { id } = req.params;

  // Gọi hàm lấy chi tiết người dùng từ module 'userService'
  userService.getDetailUser({ id }, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ userService
    if (err) {
      // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi
      res.status(500).send({
        error: err.message,
      });
    } else {
      // Trả về mã thành công 201 và thông tin chi tiết người dùng nếu không có lỗi
      res.status(201).send({
        user: result,
      });
    }
  });
};

// Hàm cập nhật thông tin người dùng
const updateUser = (req, res) => {
  // Lấy đối tượng người dùng cần cập nhật từ body của request
  const userUpdate = req.body;

  // Gọi hàm cập nhật người dùng từ module 'userService'
  userService.updateUser(userUpdate, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ userService
    if (err) {
      // Trả về mã lỗi 500, thông báo lỗi và thông tin lỗi chi tiết nếu có
      res.status(500).send({
        errData: err.data,
        error: err.message,
      });
    } else {
      // Trả về mã thành công 202 nếu không có lỗi
      res.status(202).send("Success");
    }
  });
};

// Hàm xóa người dùng
const deleteUser = (req, res) => {
  // Lấy ID người dùng cần xóa từ parameters của request
  const { id } = req.params;

  // Gọi hàm xóa người dùng từ module 'userService'
  userService.deleteUser({ id }, (err, result) => {
    // Xử lý kết quả hoặc lỗi từ userService
    if (err) {
      // Trả về mã lỗi 500 và thông báo lỗi nếu có lỗi
      res.status(500).send({
        error: err.message,
      });
    } else {
      // Trả về mã thành công 204 nếu không có lỗi
      res.status(204).send("Success");
    }
  });
};

// Export các hàm như một module
export default {
  searchUsers,
  addUser,
  getDetailUser,
  updateUser,
  deleteUser,
};
