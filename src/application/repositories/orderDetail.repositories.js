import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListOrderDetail = (params, callback) => {
    connection.query(`SELECT rikkei_academy.order_details.*,products.image FROM rikkei_academy.order_details left join products on rikkei_academy.order_details.product_id=products.id where order_id=?`, [params], (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const getOrderDetailById = (params, callback) => {
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