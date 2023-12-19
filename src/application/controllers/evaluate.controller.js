import evaluateService from "../services/evaluate.service.js";

// Hàm này lấy danh sách evaluate từ service và trả về cho client
const getListEvaluate = (req, res) => {
    evaluateService.getListEvaluate("", (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông điệp lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về danh sách evaluate với mã 200
            res.status(200).send(result);
        }
    });
}

// Hàm này lấy thông tin chi tiết của một evaluate dựa trên ID từ service và trả về cho client
const getDetailEvaluate = (req, res) => {
    const { id } = req.params;
    evaluateService.getDetailEvaluate(id, (err, result) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông điệp lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về thông tin chi tiết của evaluate với mã 200
            res.status(200).send(result);
        }
    });
}

// Hàm này thêm một evaluate mới thông qua service và trả về thông điệp kết quả cho client
const addEvaluate = (req, res) => {
    const newOrder = req.body;
    evaluateService.addEvaluate(newOrder, (err, order) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông điệp lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về thông điệp thành công với mã 200
            res.status(200).send(order.message);
        }
    });
}

// Hàm này cập nhật thông tin của một evaluate thông qua service và trả về thông điệp kết quả cho client
const updateEvaluate = (req, res) => {
    const newOrder = req.body;
    evaluateService.updateEvaluate(newOrder, (err, order) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông điệp lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về thông điệp thành công với mã 200
            res.status(200).send(order.message);
        }
    });
}

// Hàm này xóa một evaluate dựa trên ID thông qua service và trả về thông điệp kết quả cho client
const deleteEvaluate = (req, res) => {
    const { id } = req.params;
    evaluateService.deleteEvaluate(id, (err, order) => {
        if (err) {
            // Nếu có lỗi, trả về mã lỗi 500 và thông điệp lỗi
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            // Nếu thành công, trả về thông điệp thành công với mã 200
            res.status(200).send(order.message);
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
