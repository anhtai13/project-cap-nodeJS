import evaluateRepositories from "../repositories/evaluate.repositories.js";

// Hàm này lấy danh sách đánh giá từ repository và gọi lại callback với kết quả hoặc lỗi
const getListEvaluate = (params, callback) => {
    evaluateRepositories.getListEvaluate(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với danh sách đánh giá
            callback(null, result);
        }
    });
}

// Hàm này lấy thông tin chi tiết của một đánh giá dựa trên tham số từ repository và gọi lại callback với kết quả hoặc lỗi
const getDetailEvaluate = (params, callback) => {
    evaluateRepositories.getDetailEvaluate(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với thông tin chi tiết đánh giá
            callback(null, result);
        }
    });
}

// Hàm này thêm mới một đánh giá thông qua repository và gọi lại callback với kết quả hoặc lỗi
const addEvaluate = (params, callback) => {
    evaluateRepositories.addEvaluate(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với thông báo thành công hoặc thông tin chi tiết đánh giá mới
            callback(null, result);
        }
    });
}

// Hàm này cập nhật thông tin của một đánh giá thông qua repository và gọi lại callback với kết quả hoặc lỗi
const updateEvaluate = (params, callback) => {
    evaluateRepositories.updateEvaluate(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với thông báo thành công hoặc thông tin chi tiết đánh giá đã được cập nhật
            callback(null, result);
        }
    });
}

// Hàm này xóa một đánh giá dựa trên tham số từ repository và gọi lại callback với kết quả hoặc lỗi
const deleteEvaluate = (params, callback) => {
    evaluateRepositories.deleteEvaluate(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với thông báo thành công hoặc thông tin chi tiết về việc xóa đánh giá
            callback(null, result);
        }
    });
}

// Xuất các hàm chức năng để sử dụng ở bên ngoài module
export default {
    getListEvaluate,
    addEvaluate,
    updateEvaluate,
    getDetailEvaluate,
    deleteEvaluate
}
