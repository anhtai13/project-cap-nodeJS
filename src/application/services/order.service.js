import orderRepository from "../repositories/order.repository.js";
import fs from "fs";
import { getFileExtension } from "../../utilities/upload.util.js";
import moment from "moment";

const searchOrders = (params, callback) => {
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit is number" }, null);
    } else if (params.page && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page is number" }, null);
    } else {
        orderRepository.searchOrders(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const addOrder = (requestBody, callback) => {
    let path = null;

    const validate = (params) => {
        let errors = new Map();

        // Validate name product
        // if (!params.serial_number) {
        //     errors.set("serial_number", "Tên sản phẩm không được bỏ trống.");
        // } else if (typeof params.serial_number !== "string") {
        //     errors.set("serial_number", "Tên sản phẩm phải là chuỗi.");
        // }
        return errors;
    };

    const validateErrors = validate(requestBody.cart);
    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let totalPrice = 0;
        let orderDetails = [];
        for (let item of requestBody.cart) {
            const subTotalPrice = item.unit_price * item.quantity;

            totalPrice += subTotalPrice;
            orderDetails.push({
                service_id: item.service_id,
                note: item.note,
                unit_price: item.unit_price,
                quantity: item.quantity,
                sub_total_price: subTotalPrice,
                address_order: item.address_order,
                date_receive: moment().format("YYYY-MM-DD"),
            });
        }

        const newOrder = {
            serial_number: new Date().getTime(),
            user_id: requestBody.authId,
            total_price: totalPrice,
            note: requestBody.note,
            status_id: 1,
            created_by_id: requestBody.authId,
        };

        orderRepository.addOrder(newOrder, orderDetails, (error, result) => {
            if (path) {
                fs.rmSync(path);
            }
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const updateOrder = (orderId, requestBody, callback) => {
    let originalName = null;
    let path = null;

    if (requestBody.image) {
        originalName = requestBody.image.originalname;
        path = requestBody.image.path;
    }

    const validate = (params) => {
        let errors = new Map();

        // Validate name product
        if (!params.serial_number) {
            errors.set("serial_number", "Tên sản phẩm không được bỏ trống.");
        } else if (typeof params.serial_number !== "string") {
            errors.set("serial_number", "Tên sản phẩm phải là chuỗi.");
        }

        if (typeof params.status !== "string") {
            errors.set("status", "Vai trò phải là chuỗi.");
        } else if (
            params.status_id !== "1" &&
            params.status_id !== "2" &&
            params.status_id !== "3" &&
            params.status_id !== "4" &&
            params.status_id !== "5" &&
            params.status_id !== "6" &&
            params.status_id !== "7"
        ) {
            errors.set("status", "Vai trò chỉ cho phép nhập 1 , 2.");
        }

        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let image = null;

        if (requestBody.image) {
            const imageExtension = getFileExtension(originalName);
            image = `image/${requestBody.name}.${imageExtension}`;
            const imageLocation = `./public/${image}`;

            // Copy upload file to saving location
            fs.cpSync(path, imageLocation);
        }

        const updateOrder = {
            user_id: requestBody.user_id,
            order_at: requestBody.order_at,
            total_price: requestBody.total_price,
            note: requestBody.note,
            status_id: requestBody.status_id,
        };

        orderRepository.updateOrder(orderId, updateOrder, (error, result) => {
            if (path) {
                fs.rmSync(path);
            }
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
        orderRepository.getDetailOrder(id, (error, result) => {
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

const getDetailOrderDetail = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        orderRepository.getDetailOrderDetail(id, (error, result) => {
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

const deleteOrder = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        orderRepository.deleteOrder(id, (error, result) => {
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
    searchOrders,
    addOrder,
    updateOrder,
    getDetailOrder,
    getDetailOrderDetail,
    deleteOrder,
};
