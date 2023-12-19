import { validateIdDetailAndDelete, validatePrice } from "../../utils/validationServices.js";
import servicesRepositories from "../repositories/service.repositories.js";

// Hàm này lấy danh sách dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const getListService = (params, callback) => {
    servicesRepositories.getListService(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với kết quả danh sách dịch vụ
            callback(null, result);
        }
    });
}

// Hàm này lấy danh sách dịch vụ theo một danh mục cụ thể từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const getServiceByCategory = (params, callback) => {
    servicesRepositories.getServiceByCategory(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với kết quả danh sách dịch vụ theo danh mục
            callback(null, result);
        }
    });
}

// Hàm này lấy danh sách các danh mục dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const getServiceCategory = (params, callback) => {
    servicesRepositories.getServiceCategory(params, (err, result) => {
        if (err) {
            // Nếu có lỗi, gọi lại callback với thông báo lỗi
            callback(err, null);
        } else {
            // Nếu thành công, gọi lại callback với kết quả danh sách danh mục dịch vụ
            callback(null, result);
        }
    })
}

// Hàm này thêm mới một dịch vụ từ request parameters và gọi lại callback với kết quả hoặc lỗi
const addService = (params, callback) => {
    // Kiểm tra các trường thông tin cần thiết, và xác thực giá trị giá cả
    if (!params.name_service && !params.description && !params.unit_price && !params.category_name) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.unit_price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        // Gọi hàm thêm mới dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
        servicesRepositories.addService(params, (err, result) => {
            if (err) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback(err, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả dịch vụ mới được thêm
                callback(null, result);
            }
        });
    }
}

// Hàm này lấy thông tin chi tiết của một dịch vụ dựa trên service_id từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const getDetailService = (params, callback) => {
    // Kiểm tra tính hợp lệ của service_id
    if (!validateIdDetailAndDelete(params.service_id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        // Gọi hàm lấy thông tin chi tiết dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
        servicesRepositories.getDetailService(params, (err, result) => {
            if (err) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback(err, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả thông tin chi tiết của dịch vụ
                callback(null, result);
            }
        });
    }
}

// Hàm này cập nhật thông tin của một dịch vụ từ request parameters thông qua service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const updateService = (params, callback) => {
    // Kiểm tra các trường thông tin cần thiết, và xác thực giá trị giá cả
    if (!params.name_service && !params.description && !params.category_name && !params.unit_price && !params.category_id) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.unit_price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        // Gọi hàm cập nhật dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
        servicesRepositories.updateService(params, (err, result) => {
            if (err) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback(err, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả thông báo thành công
                callback(null, result);
            }
        });
    }
}

// Hàm này xóa một dịch vụ dựa trên service_id từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
const deleteService = (params, callback) => {
    // Kiểm tra tính hợp lệ của service_id
    if (!validateIdDetailAndDelete(params.service_id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        // Gọi hàm xóa dịch vụ từ service.repositories.js và gọi lại callback với kết quả hoặc lỗi
        servicesRepositories.deleteService(params, (err, result) => {
            if (err) {
                // Nếu có lỗi, gọi lại callback với thông báo lỗi
                callback(err, null);
            } else {
                // Nếu thành công, gọi lại callback với kết quả thông báo thành công
                callback(null, result);
            }
        });
    }
}

// Xuất các hàm chức năng để sử dụng ở bên ngoài module
export default {
    getListService,
    getServiceCategory,
    getServiceByCategory,
    addService,
    getDetailService,
    updateService,
    deleteService
}
