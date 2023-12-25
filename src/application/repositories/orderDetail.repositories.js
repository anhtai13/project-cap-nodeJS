import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListOrderDetail = (params, callback) => {
    connection.query(`SELECT * from orders left join order_details on orders.order_id=order_details.order_id where user_id=?`, [params], (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const getOrderDetailById = (params, callback) => {
    console.log(params)
    connection.query(`SELECT * from order_details where order_id`, [params], (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

export default {
    getListOrderDetail,
    getOrderDetailById
}