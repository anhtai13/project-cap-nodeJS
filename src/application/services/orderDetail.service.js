import orderDetailrepository from "../repositories/orderDetail.repository.js";

const searchOrderDetails = (params, callback) => {
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit is number" }, null);
    } else if (params.page && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page is number" }, null);
    } else {
        orderDetailrepository.searchOrderDetails(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const getDetailOrder = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        orderDetailrepository.getDetailOrder(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: "Order not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const deleteOrderDetail = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        orderDetailrepository.deleteOrderDetail(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({ message: "Order not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

export default {
    searchOrderDetails,
    getDetailOrder,
    deleteOrderDetail,
};
