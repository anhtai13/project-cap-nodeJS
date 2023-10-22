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
            updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
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
                orderDetail.product_id,
                orderDetail.sku,
                orderDetail.name,
                orderDetail.unit_price,
                orderDetail.quantity,
                orderDetail.sub_total_price,
            ];
        });

        connection.query(
            "INSERT INTO order_details (order_id, product_id, sku, name, unit_price, quantity, sub_total_price) VALUES ?",
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
        "SELECT rikkei_academy.order_details.*, products.image FROM rikkei_academy.order_details left join products on order_details.product_id=products.product_id WHERE order_id = ?",
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
        "UPDATE orders SET serial_number = ?, user_id = ?, order_at = ? , total_price = ?, status = ?";
    let bindParams = [
        params.serial_number,
        params.user_id,
        params.order_at,
        params.total_price,
        params.status,
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
