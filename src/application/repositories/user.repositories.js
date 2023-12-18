// Import các hàm từ file 'connection.database.js' và các thư viện khác
import getConnection from '../../config/connection.database.js'
import bcrypt from 'bcryptjs'

// Tạo kết nối đến cơ sở dữ liệu
const connection = getConnection();

// Thiết lập giá trị mặc định cho limit và offset
let limitDefault = 5
let offsetDefault = 0

// Tạo salt cho việc hash password bằng bcrypt
let salt = bcrypt.genSaltSync(10);

// Hàm tìm kiếm người dùng dựa trên các tham số đầu vào
const searchUsers = (params, callback) => {
    // Kiểm tra nếu cả limit và offset đều được cung cấp
    if (params.limit && params.offset) {
        limitDefault = params.limit
        offsetDefault = params.offset
        // Kiểm tra các tham số và tạo câu truy vấn SQL tương ứng
        if (params.name) {
            // Escaping ký tự đơn nháy trong tham số 'name' để ngăn chặn SQL injection
            const safeParam = params.name.replace("'", "\\'")
            // Truy vấn để tìm kiếm người dùng theo tên với limit và offset
            connection.query(`SELECT * FROM users WHERE username LIKE '%${safeParam}%' 
            LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                // Xử lý kết quả truy vấn và lỗi
                if (error) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "Không tìm thấy người dùng" }, null)
                } else {
                    callback(null, results);
                }
            });
        } else if (params.sortName) {
            // Truy vấn để lấy danh sách người dùng được sắp xếp theo tên với limit và offset
            connection.query(`SELECT * FROM users ORDER BY username ${params.sortName} 
            LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                // Xử lý kết quả truy vấn và lỗi
                if (error) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "Không tìm thấy người dùng" }, null)
                } else {
                    callback(null, results);
                }
            });
        } else if (params.sortRole) {
            // Truy vấn để lấy danh sách người dùng được sắp xếp theo vai trò với limit và offset
            connection.query(`SELECT * FROM users ORDER BY role ${params.sortRole} 
            LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                // Xử lý kết quả truy vấn và lỗi
                if (error) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "Không tìm thấy người dùng" }, null)
                } else {
                    callback(null, results);
                }
            });
        } else if (params.sortLastName) {
            // Truy vấn để lấy danh sách người dùng được sắp xếp theo họ với limit và offset
            connection.query(`SELECT * FROM users ORDER BY role ${params.sortLastName} 
            LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                // Xử lý kết quả truy vấn và lỗi
                if (error) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "Không tìm thấy người dùng" }, null)
                } else {
                    callback(null, results);
                }
            });
        } else {
            // Truy vấn để lấy tất cả người dùng với limit và offset
            connection.query(`SELECT * FROM users`, (error, results) => {
                // Xử lý kết quả truy vấn và lỗi
                if (error) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else {
                    callback(null, results);
                }
            });
        }
    } else {
        // Nếu limit và offset không được cung cấp
        // Logic tương tự như trên, kiểm tra các tham số và tạo câu truy vấn SQL tương ứng
    }
}

// Hàm để thêm một người dùng mới vào cơ sở dữ liệu
const addUser = (params, callback) => {
    // Hash password của người dùng bằng bcrypt
    const hashedPassword = bcrypt.hashSync(params.password, salt)
    // Kiểm tra xem người dùng có cùng username đã tồn tại chưa
    connection.query('SELECT * FROM users WHERE username = ?', [params.username], (err, results) => {
        // Xử lý lỗi của truy vấn
        if (err) {
            callback({ message: "Có lỗi xảy ra!" }, null)
        }
        // Nếu đã tồn tại người dùng có cùng username
        if (results.length > 0) {
            callback({ message: 'Username đã tồn tại' }, null)
        } else {
            // Nếu username là duy nhất, thêm người dùng mới vào cơ sở dữ liệu
            connection.query(
                'INSERT INTO users (username, email, password, first_name, last_name, role, avatar, created_at, updated_at, created_by_id, updated_by_id, api_key, status, address_user, phone_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [params.username, params.email, hashedPassword, params.first_name, params.last_name, params.role, params.avatar, params.created_at, params.updated_at, params.created_by_id, params.updated_by_id, null, params.status, params.address_user, params.phone_number],
                (err, results) => {
                    // Xử lý lỗi của truy vấn thêm mới
                    if (err) {
                        callback({ message: "Có lỗi xảy ra!" }, null);
                    } else {
                        callback(null, results);
                    }
                }
            );
        }
    })
}

// Hàm để lấy chi tiết của một người dùng cụ thể
const getDetailUser = (params, callback) => {
    // Truy vấn để lấy chi tiết người dùng dựa trên ID người dùng
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        // Xử lý kết quả truy vấn và lỗi
        if (error) {
            callback({ message: "Có lỗi xảy ra!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Không tìm thấy người dùng" }, null)
        } else {
            callback(null, results);
        }
    });
}

// Hàm để cập nhật thông tin người dùng
const updateUser = (params, callback) => {
    // Truy vấn để kiểm tra xem người dùng với ID cụ thể có tồn tại không
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        // Xử lý kết quả truy vấn và lỗi
        if (error) {
            callback({ message: "Có lỗi xảy ra!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Không tìm thấy người dùng" }, null)
        } else {
            // Cập nhật thông tin người dùng trong cơ sở dữ liệu
            connection.query("UPDATE users SET username=?, email=?, password=?, first_name=?, last_name=?, role=?, avatar=?, created_at=?, updated_at=?, created_by_id=?, updated_by_id=? WHERE id=?",
                [params.username, params.email, params.password, params.first_name,
                params.last_name, params.role, params.avatar, params.created_at, params.updated_at,
                params.created_by_id, params.updated_by_id, params.id], (err, results) => {
                    // Xử lý lỗi của truy vấn cập nhật
                    if (err) {
                        callback({ message: "Có lỗi xảy ra!" }, null);
                    } else {
                        callback(null, results);
                    }
                })
        }
    });
}

// Hàm để xóa một người dùng khỏi cơ sở dữ liệu
const deleteUser = (params, callback) => {
    // Truy vấn để kiểm tra xem người dùng với ID cụ thể có tồn tại không
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        // Xử lý kết quả truy vấn và lỗi
        if (error) {
            callback({ message: "Có lỗi xảy ra!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Không tìm thấy người dùng" }, null)
        } else {
            // Xóa người dùng khỏi cơ sở dữ liệu
            connection.query("DELETE FROM users WHERE id=?", [params.id], (err, results) => {
                // Xử lý lỗi của truy vấn xóa
                if (err) {
                    callback({ message: "Có lỗi xảy ra!" }, null);
                } else {
                    callback(null, results);
                }
            })
        }
    });
}

// Xuất các hàm như một module
export default {
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}
