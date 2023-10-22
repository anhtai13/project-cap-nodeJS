import url from "url";
import userRepository from "./../repositories/user.repository.js";

export default function (request, response, next) {
    const { pathname } = url.parse(request.url, true);
    const method = request.method;

    if (
        (method === "POST" && pathname === "/login") ||
        (method === "POST" && pathname === "/register")
    ) {
        // Nếu yêu cầu là POST và đường dẫn là "/login" hoặc "/register", tiếp tục xử lý
        next();
    } else {
        // Lấy giá trị API Key từ header của yêu cầu
        const apiKey = request.header("X-API-Key");

        console.log("auth middleware", apiKey);
        if (!apiKey) {
            // Nếu không có API Key, trả về mã lỗi 401 (Unauthorized) và thông báo lỗi
            response.status(401).send({
                error: "Không thể xác thực.",
            });
        } else {
            // Gọi hàm userRepository.getUserByApiKey để lấy thông tin người dùng dựa trên API Key
            userRepository.getUserByApiKey(apiKey, (error, result) => {
                if (error) {
                    // Nếu có lỗi trong quá trình lấy thông tin người dùng, trả về mã lỗi 500 và thông báo lỗi
                    response.status(500).send({
                        error: error.message,
                    });
                } else if (result.length === 0) {
                    // Nếu không tìm thấy người dùng dựa trên API Key, trả về mã lỗi 401 và thông báo lỗi
                    response.status(401).send({
                        error: "Không thể xác thực.",
                    });
                } else {
                    // Nếu xác thực thành công, lưu thông tin người dùng vào request.auth và tiếp tục xử lý yêu cầu
                    const auth = result[0];
                    request.auth = auth;

                    next();
                }
            });
        }
    }
}
