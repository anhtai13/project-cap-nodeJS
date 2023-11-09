import moment from "moment";
import getConnection from "./../../config/connection.database.js";

const searchOrders = (params, callback) => {
    const connection = getConnection();

    let sql = " FROM orders INNER JOIN users ON users.id = orders.user_id";
    const bindParams = [];

    const page = params.page || 1;
    const limit = params.limit || 5;

    const offset = (page - 1) * limit;

    if (params.name) {
        const name = "%" + params.name + "%";
        sql += " WHERE username LIKE ?";
        bindParams.push(name);
    }
    const countQuery = "SELECT COUNT(1) AS total" + sql;

    connection.query(countQuery, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);
        } else if (countResult[0].total !== 0) {
            const selectColumnsQuery =
                "SELECT orders.*, users.username" +
                sql +
                ` LIMIT ${limit} OFFSET ${offset}`;
            connection.query(
                selectColumnsQuery,
                bindParams,
                (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, {
                            total: countResult[0].total,
                            records: result,
                        });
                    }
                }
            );
            connection.end();
        } else {
            callback(null, {
                total: 0,
                records: [],
            });
            connection.end();
        }
    });
};

const addOrder = (order, orderDetails, callback) => {
    const connection = getConnection();

    const insertOrder = (order, orderDetails) => {
        const orderToCreate = {
            ...order,
            order_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        connection.query(
            "INSERT INTO orders SET ?",
            orderToCreate,
            (error, result) => {
                if (error) {
                    rollbackTransaction();
                    callback(error, null);
                    connection.end();
                } else {
                    insertOrderDetails(result.insertId, orderDetails);
                }
            }
        );
    };

    const rollbackTransaction = () => {
        connection.query("ROLLBACK;", (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, {});
            }
            connection.end();
        });
    };

    const commitTransaction = () => {
        connection.query("COMMIT;", (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, {});
            }
            connection.end();
        });
    };

    const insertOrderDetails = (orderId, orderDetails) => {
        const newOrderDetails = orderDetails.map((orderDetail) => {
            return [
                orderId,
                orderDetail.service_id,
                orderDetail.note,
                orderDetail.unit_price,
                orderDetail.quantity,
                orderDetail.sub_total_price,
                orderDetail.address_order,
                orderDetail.date_receive,
            ];
        });

        connection.query(
            "INSERT INTO order_details (order_id, service_id, note, unit_price, quantity, sub_total_price, address_order, date_receive) VALUES ?",
            [newOrderDetails],
            (error, result) => {
                if (error) {
                    rollbackTransaction();
                    callback(error, null);
                } else {
                    commitTransaction();
                    callback(null, result);
                }
            }
        );
    };

    connection.query("START TRANSACTION;", (error, result) => {
        if (error) {
            rollbackTransaction();
            callback(error, null);
            connection.end();
        } else {
            insertOrder(order, orderDetails);
        }
    });
};

const getDetailOrder = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [id],
        (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );

    connection.end();
};

const getDetailOrderDetail = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT laudry_booking_v1_1.order_details.*, services.image FROM laudry_booking_v1_1.order_details left join services on order_details.service_id=services.service_id WHERE order_id = ?",
        [id],
        (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );

    connection.end();
};

const updateOrder = (orderId, params, callback) => {
    const connection = getConnection();

    let sql =
        "UPDATE orders SET serial_number = ?, user_id = ?, order_at = ? , total_price = ?,note = ? ,  status_id = ?";
    let bindParams = [
        params.serial_number,
        params.user_id,
        params.order_at,
        params.total_price,
        params.note,
        params.status_id,
    ];

    if (params.image) {
        sql += " image = ?";
        bindParams.push(params.image);
    }

    sql += " WHERE order_id = ?";
    bindParams.push(orderId);

    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

    connection.end();
};

const deleteOrder = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "DELETE FROM orders WHERE order_id = ?",
        [id],
        (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );

    connection.end();
};

export default {
    searchOrders,
    addOrder,
    getDetailOrder,
    getDetailOrderDetail,
    updateOrder,
    deleteOrder,
};
