import authService from "../services/auth.service.js";

const login = (request, response) => {
    // Lấy thông tin từ phần body của yêu cầu
    const requestBody = request.body;

    // Tạo đối tượng params chứa thông tin cần thiết cho việc đăng nhập
    const params = {
        username: requestBody.username,
        password: requestBody.password,
        type: requestBody.type,
    };

    // Gọi hàm authService.login để thực hiện đăng nhập
    authService.login(params, (error, result) => {
        // Xử lý kết quả từ authService.login
        if (error) {
            // Nếu có lỗi trong quá trình đăng nhập, trả về mã lỗi và thông báo lỗi trong phản hồi
            response.status(error.code).send({ error: error.message });
        } else {
            // Nếu đăng nhập thành công, trả về kết quả trong phản hồi
            response.send(result);
        }
    });
};

const getAuth = (request, response) => {
    // Gọi hàm authService.getAuth để lấy thông tin xác thực của người dùng
    authService.getAuth(request.auth.user_id, (error, result) => {
        // Xử lý kết quả từ authService.getAuth
        if (error) {
            // Nếu có lỗi trong quá trình lấy thông tin xác thực, trả về mã lỗi 401 và thông báo lỗi
            response.status(401).send({
                error: error,
            });
        } else {
            // Nếu lấy thông tin xác thực thành công, trả về kết quả
            response.send(result);
        }
    });
};

const logout = (request, response) => {
    // Gọi hàm authService.logout để đăng xuất người dùng
    authService.logout(request.auth.user_id, (error, result) => {
        // Xử lý kết quả từ authService.logout
        if (error) {
            // Nếu có lỗi trong quá trình đăng xuất, trả về mã lỗi 401 và thông báo lỗi
            response.status(401).send({
                error: error,
            });
        } else {
            // Nếu đăng xuất thành công, trả về kết quả
            response.send(result);
        }
    });
};

const register = (request, response) => {
    // Lấy dữ liệu từ phần body của yêu cầu
    const requestBody = request.body;
    console.log(requestBody);
    // Gọi hàm userService.addUser để thêm người dùng mới vào hệ thống
    authService.register(
        {
            ...requestBody,
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

export default {
    login,
    getAuth,
    logout,
    register,
};
