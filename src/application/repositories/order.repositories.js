import getConnection from "../../config/connection.database.js";
import { sendSimpleEmail } from "../services/email.service.js";

const connection = getConnection();

const getListOrder = (params, callback) => {
    connection.query(`SELECT * FROM orders`, (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const getOrderTotalPrice = (params, callback) => {
    connection.query(`SELECT *, SUM(total_price) AS total_price_user FROM orders group by user_id;`, (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const addOrder = (params, callback) => {
    connection.query(`insert into orders (serial_number,user_id,order_at,total_price,status,note,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?,?,?)`,
        [params.serial_number, params.user_id, params.order_at, params.total_price, params.status, params.note, params.created_at, params.created_by_id, params.updated_at, params.updated_by_id],
        (error, results) => {
            if (error) {
                callback({ message: "Something wrong!" }, null);
            }
            else {
                const lastIdInsert = results.insertId
                params.listProductOrder.forEach(item => {
                    connection.query(`insert into order_details (order_id,sequence_no,product_id,sku,name,unit_price,quantity,sub_total_price) values (?,?,?,?,?,?,?,?)`,
                        [lastIdInsert, Math.floor(Math.random() * 1000), item.product_id, item.sku, item.name, item.unit_price, item.quantity, item.sub_total_price])
                })
                callback(null, { message: "Thành công đặt đơn hàng!" })
            }
        });
}

const getDetailOrder = (params, callback) => {
    connection.query(`SELECT rikkei_academy.orders.*, users.username,users.email,users.first_name,users.last_name FROM rikkei_academy.orders left join users on orders.user_id=users.id where orders.user_id=?`, [+params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback(null, results)
        } else {
            callback(null, results);
        }
    })
}

const getDetailOrderById = (params, callback) => {
    connection.query(`SELECT rikkei_academy.orders.*, order_details.sku,order_details.name,order_details.unit_price,order_details.sub_total_price,order_details.quantity FROM rikkei_academy.orders left join order_details on orders.id=order_details.order_id where orders.id=?`, [+params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Order not found!" }, null)
        } else {
            callback(null, results);
        }
    })
}

const updateOrder = (params, callback) => {
    connection.query(`SELECT * FROM orders WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Order not found!" }, null)
        } else {
            connection.query("update orders set serial_number=?,user_id=?,order_at=?,total_price=?,status=?,note=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where id=?",
                [params.serial_number, params.user_id, params.order_at, params.total_price,
                params.status, params.note, params.created_at, params.created_by_id,
                params.updated_at, params.updated_by_id, params.id], (err, results) => {
                    if (err) {
                        callback({ message: "Something wrong!" }, null);
                    } else {
                        callback(null, results);
                    }
                })
        }
    }
    )
}

const deleteOrder = (params, callback) => {
    connection.query(`SELECT * FROM orders WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Order not found!" }, null)
        } else {
            connection.query("delete from orders where id=?", [params.id], (err, results) => {
                if (err) {
                    callback({ message: "Something wrong!" }, null);
                } else {
                    connection.query("delete from order_details where order_id=?", [params.id], (err, results) => {
                        if (err) {
                            callback({ message: "Something wrong!" }, null);
                        } else {
                            callback(null, { message: "Delete successful!" })
                        }
                    })
                }
            })
        }
    }
    )
}

export default {
    getListOrder,
    addOrder,
    getDetailOrder,
    updateOrder,
    deleteOrder,
    getOrderTotalPrice,
    getDetailOrderById
}