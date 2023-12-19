import getConnection from "../../config/connection.database.js";

// Lấy kết nối đến cơ sở dữ liệu
const connection = getConnection();

// Hàm này lấy danh sách đánh giá từ bảng evaluates và gọi lại callback với kết quả hoặc lỗi
const getListEvaluate = (params, callback) => {
    connection.query(`SELECT * FROM evaluates`, (error, results) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else {
            // Nếu thành công, gọi lại callback với danh sách đánh giá
            callback(null, results);
        }
    });
}

// Hàm này lấy thông tin chi tiết của một đánh giá dựa trên evaluate_id từ bảng evaluates và gọi lại callback với kết quả hoặc lỗi
const getDetailEvaluate = (params, callback) => {
    connection.query(`SELECT * FROM evaluates WHERE evaluate_id=?`, [+params],
        (error, results) => {
            if (error) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback({ message: "Something wrong!" }, null);
            } else {
                // Nếu thành công, gọi lại callback với thông tin chi tiết của đánh giá
                callback(null, results[0]);
            }
        });
}

// Hàm này thêm mới một đánh giá vào bảng evaluates và gọi lại callback với kết quả hoặc lỗi
const addEvaluate = (params, callback) => {
    connection.query(`INSERT INTO evaluates (full_name, email, content, rate, created_at, created_by_id, updated_at, updated_by_id) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [params.full_name, params.email, params.content, params.rate, params.created_at, params.created_by_id, params.updated_at, params.updated_by_id],
        (error, results) => {
            if (error) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback({ message: "Something wrong!" }, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả thêm mới
                callback(null, results);
            }
        });
}

// Hàm này cập nhật thông tin của một đánh giá trong bảng evaluates và gọi lại callback với kết quả hoặc lỗi
const updateEvaluate = (params, callback) => {
    connection.query(`SELECT * FROM evaluates WHERE evaluate_id=?`, [params.evaluate_id], (error, results, fields) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            // Nếu không tìm thấy đánh giá, gọi lại callback với thông báo
            callback({ message: "Contact not found!" }, null)
        } else {
            // Nếu tìm thấy đánh giá, tiến hành cập nhật thông tin
            connection.query(`UPDATE evaluates SET full_name=?, email=?, content=?, rate=?, created_at=?, created_by_id=?, updated_at=?, updated_by_id=? WHERE evaluate_id=?`,
                [params.full_name, params.email, params.content, params.rate,
                params.created_at, params.created_by_id,
                params.updated_at, params.updated_by_id, params.evaluate_id], (err, results) => {
                    if (err) {
                        // Nếu có lỗi trong quá trình cập nhật, gọi lại callback với thông báo lỗi
                        callback({ message: "Something wrong!" }, null);
                    } else {
                        // Nếu thành công, gọi lại callback với kết quả cập nhật
                        callback(null, results);
                    }
                })
        }
    });
}

// Hàm này xóa một đánh giá dựa trên evaluate_id từ bảng evaluates và gọi lại callback với kết quả hoặc lỗi
const deleteEvaluate = (params, callback) => {
    connection.query(`SELECT * FROM evaluates WHERE evaluate_id=?`, [+params], (error, results, fields) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            // Nếu không tìm thấy đánh giá, gọi lại callback với thông báo
            callback({ message: "Contact not found!" }, null)
        } else {
            // Nếu tìm thấy đánh giá, tiến hành xóa
            connection.query(`DELETE FROM evaluates WHERE evaluate_id=?`,
                [+params], (err, results) => {
                    if (err) {
                        // Nếu có lỗi trong quá trình xóa, gọi lại callback với thông báo lỗi
                        callback({ message: "Something wrong!" }, null);
                    } else {
                        // Nếu thành công, gọi lại callback với kết quả xóa
                        callback(null, results);
                    }
                })
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
