import moment from "moment";
import getConnection from "./../../config/connection.database.js";

const searchOrderDetails = (params, callback) => {
    const connection = getConnection();

    let sql = " FROM order_details";
    const bindParams = [];

    const page = params.page || 1;
    const limit = params.limit || 5;

    const offset = (page - 1) * limit;

    if (params.name) {
        const name = "%" + params.name + "%";
        sql += " WHERE name LIKE ?";
        bindParams.push(name);
    }
    const countQuery = "SELECT COUNT(1) AS total" + sql;

    connection.query(countQuery, bindParams, (error, countResult) => {
        if (error) {
            callback(error, null);
        } else if (countResult[0].total !== 0) {
            const selectColumnsQuery =
                "SELECT order_id, service_id,note, unit_price, quantity, sub_total_price, address_order, date_receive" +
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

const getDetailOrder = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT * FROM order_details WHERE order_id = ?",
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

const deleteOrderDetail = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "DELETE FROM order_details WHERE order_detail_id = ?",
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
    searchOrderDetails,
    getDetailOrder,
    deleteOrderDetail,
};
