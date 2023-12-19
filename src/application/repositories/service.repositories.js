import getConnection from "../../config/connection.database.js";

// Lấy kết nối đến cơ sở dữ liệu
const connection = getConnection();

// Giá trị mặc định cho limit và offset
let limitDefault = 5;
let offsetDefault = 0;

// Hàm này lấy danh sách dịch vụ từ bảng services với sự điều chỉnh limit và offset (nếu có) và gọi lại callback với kết quả hoặc lỗi
const getListService = (params, callback) => {
    if (params.limit && params.offset) {
        limitDefault = params.limit;
        offsetDefault = params.offset;
        connection.query(`SELECT * FROM services LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
            if (error) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback({ message: "Something wrong!" }, null);
            } else {
                // Nếu thành công, gọi lại callback với danh sách dịch vụ
                callback(null, results);
            }
        });
    } else {
        // Nếu không có limit và offset, lấy toàn bộ danh sách dịch vụ từ bảng services và gọi lại callback
        connection.query(`SELECT * FROM services`, (error, results) => {
            if (error) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback({ message: "Something wrong!" }, null);
            } else {
                // Nếu thành công, gọi lại callback với danh sách dịch vụ
                callback(null, results);
            }
        });
    }
}

// Hàm này lấy danh sách các danh mục dịch vụ từ bảng service_category và gọi lại callback với kết quả hoặc lỗi
const getServiceCategory = (params, callback) => {
    connection.query(`SELECT * FROM service_category`, (error, results) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else {
            // Nếu thành công, gọi lại callback với danh sách danh mục dịch vụ
            callback(null, results);
        }
    });
}

// Hàm này lấy danh sách dịch vụ dựa trên một danh mục cụ thể từ bảng services và gọi lại callback với kết quả hoặc lỗi
const getServiceByCategory = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE category_name="${params.category_name}"`, (error, results) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else {
            // Nếu thành công, gọi lại callback với danh sách dịch vụ theo danh mục
            callback(null, results);
        }
    });
}

// Hàm này thêm mới một dịch vụ vào bảng services và gọi lại callback với kết quả hoặc lỗi
const addService = (params, callback) => {
    connection.query(
        'INSERT INTO services (description, name_service, unit_price, category_id, image, created_at, created_by_id, updated_at, updated_by_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [params.description, params.name_service, params.unit_price, params.category_id, params.image, params.created_at, params.created_by_id, params.updated_at, params.updated_by_id],
        (err, results) => {
            if (err) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback({ message: "Something went wrong!" }, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả thêm mới
                callback(null, results);
            }
        }
    );
}

// Hàm này lấy thông tin chi tiết của một dịch vụ dựa trên service_id từ bảng services và gọi lại callback với kết quả hoặc lỗi
const getDetailService = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE service_id=?`, [params.service_id], (error, results, fields) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            // Nếu không tìm thấy dịch vụ, gọi lại callback với thông báo
            callback({ message: "Product not found!" }, null);
        } else {
            // Nếu thành công, gọi lại callback với thông tin chi tiết của dịch vụ
            callback(null, results);
        }
    });
}

// Hàm này cập nhật thông tin của một dịch vụ trong bảng services và gọi lại callback với kết quả hoặc lỗi
const updateService = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE service_id=?`, [params.service_id], (error, results, fields) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            // Nếu không tìm thấy dịch vụ, gọi lại callback với thông báo
            callback({ message: "Product not found!" }, null);
        } else {
            // Nếu tìm thấy dịch vụ, tiến hành cập nhật thông tin
            connection.query(
                "UPDATE services SET description=?, name_service=?, category_name=?, unit_price=?, category_id=?, image=?, created_at=?, created_by_id=?, updated_at=?, updated_by_id=? WHERE service_id=?",
                [params.description, params.name_service, params.category_name, params.unit_price,
                params.category_id, params.image, params.created_at, params.created_by_id,
                params.updated_at, params.updated_by_id, params.service_id],
                (err, results) => {
                    if (err) {
                        // Nếu có lỗi trong quá trình cập nhật, gọi lại callback với thông báo lỗi
                        callback({ message: "Something wrong!" }, null);
                    } else {
                        // Nếu thành công, gọi lại callback với kết quả cập nhật
                        callback(null, results);
                    }
                });
        }
    });
}

// Hàm này xóa một dịch vụ dựa trên service_id từ bảng services và gọi lại callback với kết quả hoặc lỗi
const deleteService = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE service_id=?`, [params.service_id], (error, results, fields) => {
        if (error) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            // Nếu không tìm thấy dịch vụ, gọi lại callback với thông báo
            callback({ message: "Product not found!" }, null);
        } else {
            // Nếu tìm thấy dịch vụ, tiến hành xóa
            connection.query(`DELETE FROM services WHERE service_id=?`, [params.service_id], (err, results) => {
                if (err) {
                    // Nếu có lỗi trong quá trình xóa, gọi lại callback với thông báo lỗi
                    callback({ message: "Something wrong!" }, null);
                } else {
                    // Nếu thành công, gọi lại callback với kết quả xóa
                    callback(null, results);
                }
            });
        }
    });
}

// Xuất các hàm chức năng để sử dụng ở bên ngoài module
export default {
    getListService,
    getServiceCategory,
    getServiceByCategory,
    addService,
    getDetailService,
    updateService,
    deleteService,
}
