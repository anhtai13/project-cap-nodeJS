import userService from "./../services/user.service.js";

const searchUsers = (request, response) => {
    // Lấy các tham số tìm kiếm từ query parameters trong yêu cầu
    const { name, page, limit } = request.query;

    // Gọi hàm userService.searchUsers để tìm kiếm người dùng
    userService.searchUsers(
        { name: name, page: page, limit: limit },
        (error, result) => {
            // Xử lý kết quả từ userService.searchUsers
            if (error) {
                // Nếu có lỗi trong quá trình tìm kiếm, trả về mã lỗi 500 và thông báo lỗi
                response.status(500).send({
                    error: error.message,
                });
            } else {
                // Nếu tìm kiếm thành công, trả về danh sách người dùng
                response.send(result);
            }
        }
    );
};

const viewAddUser = (request, response) => {};

const addUser = (request, response) => {
    // Kiểm tra quyền truy cập của người dùng
    if (request.auth.role !== 1) {
        // Nếu quyền truy cập không phải là 1 thì trả về lỗi
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    // Lấy dữ liệu từ phần body của yêu cầu
    const requestBody = request.body;

    // Lấy dữ liệu về hình đại diện từ yêu cầu (nếu có)
    const avatar = request.file;

    // Gọi hàm userService.addUser để thêm người dùng mới vào hệ thống
    userService.addUser(
        {
            ...requestBody,
            authId: request.auth.user_id,
            avatar: avatar,
        },
        (error, result) => {
            // Xử lý kết quả từ userService.addUser
            if (error) {
                // Nếu có lỗi trong quá trình thêm người dùng, trả về mã lỗi 500 và thông báo lỗi
                response.status(500).send({ error: error });
            } else {
                // Nếu thêm người dùng thành công, trả về mã thành công 201
                response.status(201).send();
            }
        }
    );
};

const getDetailUser = (request, response) => {
    // Kiểm tra quyền truy cập của người dùng
    if (request.auth.role !== 1) {
        // Nếu quyền truy cập không phải là 1 (quyền đặc biệt), trả về mã lỗi 403 và thông báo
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    // Lấy user_id của người dùng từ tham số trong đường dẫn (URL)
    const { user_id } = request.params;

    // Gọi hàm userService.getDetailUser để lấy thông tin chi tiết của người dùng
    userService.getDetailUser(user_id, (error, result) => {
        // Xử lý kết quả từ userService.getDetailUser
        if (error) {
            // Nếu có lỗi trong quá trình lấy thông tin chi tiết, trả về mã lỗi 500 và thông báo lỗi
            response.status(500).send({
                error: error.message,
            });
        } else {
            // Nếu lấy thông tin chi tiết thành công, trả về thông tin người dùng
            response.send(result);
        }
    });
};

const updateUser = (request, response) => {
    // Kiểm tra quyền truy cập của người dùng
    if (request.auth.role !== 1) {
        // Nếu quyền truy cập không phải là 1 (quyền đặc biệt), trả về mã lỗi 403 và thông báo
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    // Lấy user_id của người dùng từ tham số trong đường dẫn (URL)
    const userId = request.params.user_id;

    // Lấy dữ liệu từ phần body của yêu cầu
    const requestBody = request.body;

    // Lấy dữ liệu về hình đại diện từ yêu cầu (nếu có)
    const avatar = request.file;

    // Gọi hàm userService.updateUser để cập nhật thông tin của người dùng
    userService.updateUser(
        userId,
        {
            ...requestBody,
            avatar: avatar,
        },
        (error, result) => {
            // Xử lý kết quả từ userService.updateUser
            if (error) {
                // Nếu có lỗi trong quá trình cập nhật, trả về mã lỗi 500 và thông báo lỗi
                response.status(500).send({
                    error: error.message,
                });
            } else {
                // Nếu cập nhật thành công, trả về mã thành công 200
                response.status(200).send();
            }
        }
    );
};

const deleteUser = (request, response) => {
    // Kiểm tra quyền truy cập của người dùng
    if (request.auth.role !== 1) {
        // Nếu quyền truy cập không phải là 1 (quyền đặc biệt), trả về mã lỗi 403 và thông báo
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    // Lấy user_id của người dùng từ tham số trong đường dẫn (URL)
    const { user_id } = request.params;

    // Gọi hàm userService.deleteUser để xóa người dùng
    userService.deleteUser(user_id, (error, result) => {
        // Xử lý kết quả từ userService.deleteUser
        if (error) {
            // Nếu có lỗi trong quá trình xóa, trả về mã lỗi 500 và thông báo lỗi
            response.status(500).send({
                error: error.message,
            });
        } else {
            // Nếu xóa thành công, trả về mã thành công 204
            response.status(204).send();
        }
    });
};

export default {
    searchUsers,
    viewAddUser,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser,
};
