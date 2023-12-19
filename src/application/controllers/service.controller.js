import servicesService from "../services/service.service.js";

// Hàm này lấy danh sách dịch vụ với các tham số limit và offset từ query parameters và gọi lại callback với kết quả hoặc lỗi
const getListService = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    servicesService.getListService({ limit, offset }, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 200 và danh sách dịch vụ
            res.status(200).send(result);
        }
    })
}

// Hàm này lấy danh sách các danh mục dịch vụ từ service.service.js và gọi lại callback với kết quả hoặc lỗi
const getServiceCategory = (req, res) => {
    servicesService.getServiceCategory("", (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 200 và danh sách danh mục dịch vụ
            res.status(200).send(result);
        }
    })
}

// Hàm này lấy danh sách dịch vụ dựa trên một danh mục cụ thể từ service.service.js và gọi lại callback với kết quả hoặc lỗi
const getServiceByCategory = (req, res) => {
    const category_name = req.params;
    servicesService.getServiceByCategory(category_name, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 200 và danh sách dịch vụ theo danh mục
            res.status(200).send(result);
        }
    })
}

// Hàm này thêm mới một dịch vụ từ request body và gọi lại callback với kết quả hoặc lỗi
const addService = (req, res) => {
    const newService = req.body;
    servicesService.addService(newService, (err, service) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 200 và thông tin dịch vụ mới được thêm
            res.status(200).send(service);
        }
    })
}

// Hàm này lấy thông tin chi tiết của một dịch vụ dựa trên service_id từ service.service.js và gọi lại callback với kết quả hoặc lỗi
const getDetailService = (req, res) => {
    const { service_id } = req.params;
    servicesService.getDetailService({ service_id }, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                error: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 201 và thông tin chi tiết của dịch vụ
            res.status(201).send(result[0]);
        }
    })
}

// Hàm này cập nhật thông tin của một dịch vụ từ request body thông qua service.service.js và gọi lại callback với kết quả hoặc lỗi
const updateService = (req, res) => {
    const serviceUpdate = req.body;
    servicesService.updateService(serviceUpdate, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            console.log(err);
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 202 và thông báo thành công
            res.status(202).send("Success");
        }
    })
}

// Hàm này xóa một dịch vụ dựa trên service_id từ service.service.js và gọi lại callback với kết quả hoặc lỗi
const deleteService = (req, res) => {
    const { service_id } = req.params;
    servicesService.deleteService({ service_id }, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông báo lỗi
            res.status(500).send({
                error: err.message
            });
        } else {
            // Nếu thành công, trả về mã thành công 204 và thông báo thành công
            res.status(204).send("Success");
        }
    })
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
