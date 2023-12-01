import orderDetailRepositories from "../repositories/orderDetail.repositories.js";

const getListOrderDetail = (params, callback) => {
    orderDetailRepositories.getListOrderDetail(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const getOrderDetailById = (params, callback) => {
    orderDetailRepositories.getOrderDetailById(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

export default {
    getListOrderDetail,
    getOrderDetailById
}