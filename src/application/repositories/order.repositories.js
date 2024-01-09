import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListOrder = (params, callback) => {
  connection.query(`SELECT * FROM orders`, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const getOrderTotalPrice = (params, callback) => {
  if (params != "-1") {
    connection.query(
      `SELECT *, SUM(total_price) AS total_price_user FROM orders left join users on orders.user_id=users.user_id where users.user_id=? group by orders.user_id;`,
      [params],
      (error, results) => {
        if (error) {
          callback(
            { message: "Your order is empty. Please try to order something!" },
            null
          );
        } else {
          callback(null, results);
        }
      }
    );
  } else {
    connection.query(
      `SELECT *, SUM(total_price) AS total_price_user FROM orders left join users on orders.user_id=users.user_id group by orders.user_id;`,
      (error, results) => {
        if (error) {
          callback(
            { message: "Your order is empty. Please try to order something!" },
            null
          );
        } else {
          callback(null, results);
        }
      }
    );
  }
};

const addOrder = (params, callback) => {
  //add data vào bảng orders
  connection.query(
    `insert into orders (serial_number,user_id,order_at,total_price,status_id,created_at,created_by_id,code) values (?,?,?,?,?,?,?,?)`,
    [
      params.serial_number,
      params.user_id,
      new Date(),
      params.total_price,
      params.status_id,
      new Date(),
      params.created_by_id,
      "",
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        callback({ message: "Something wrong!" }, null);
      } else {
        //get id order mới thêm vào
        const lastIdInsert = results.insertId;

        //lấy id order mới thêm vào insert vào bảng order_details
        connection.query(
          `insert into order_details (order_id,service_id,note,unit_price,quantity,sub_total_price,address_order,date_receive) values (?,?,?,?,?,?,?,?)`,
          [
            lastIdInsert,
            params.service_id,
            params.note,
            params.unit_price,
            params.quantity,
            params.subTotalPrice,
            params.address_order,
            params.date_receive.toString(),
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              callback(null, { message: "Thành công đặt đơn hàng!" });
            }
          }
        );
      }
    }
  );
};

const getDetailOrder = (params, callback) => {
  connection.query(
    `SELECT laundry_booking.orders.*, users.username,users.email,users.first_name,users.last_name FROM laundry_booking.orders left join users on orders.user_id=users.user_id where orders.user_id=?`,
    [+params.id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback(null, results);
      } else {
        callback(null, results);
      }
    }
  );
};

const getDetailOrderById = (params, callback) => {
  connection.query(
    `SELECT orders.*, order_details.*, services.* FROM order_details left join orders on orders.order_id=order_details.order_id left join services on order_details.service_id=services.service_id where orders.order_id=?`,
    [+params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateOrder = (params, callback) => {
  connection.query(
    `SELECT * FROM orders WHERE order_id=?`,
    [params.order_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        connection.query(
          "update orders set serial_number=?,user_id=?,order_at=?,total_price=?,status_id=?,created_at=?,created_by_id=?,code=? where order_id=?",
          [
            params.serial_number,
            params.user_id,
            new Date().toString(),
            params.total_price,
            params.status_id,
            new Date().toString(),
            params.created_by_id,
            "",
            params.order_id,
          ],
          (err, results) => {
            if (err) {
              console.log(err);
              callback({ message: "Something wrong!" }, null);
            } else {
              callback(null, results);
            }
          }
        );
      }
    }
  );
};

const deleteOrder = (params, callback) => {
  connection.query(
    `SELECT * FROM orders WHERE order_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        connection.query(
          "delete from order_details where order_id=?",
          [params.id],
          (err, results) => {
            if (err) {
              callback({ message: "Something wrong!" }, null);
            } else {
              connection.query(
                "delete from orders where order_id=?",
                [params.id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    callback({ message: "Something wrong!" }, null);
                  } else {
                    callback(null, { message: "Delete successful!" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderById,
};
