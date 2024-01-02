import getConnection from "../../config/connection.database.js";

const connection = getConnection();
let limitDefault = 5;
let offsetDefault = 0;
const getListProducts = (params, callback) => {
  if (params.limit && params.offset) {
    limitDefault = params.limit;
    offsetDefault = params.offset;
    connection.query(
      `SELECT * FROM services LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
      (error, results) => {
        if (error) {
          callback({ message: "Something wrong!" }, null);
        } else {
          callback(null, results);
        }
      }
    );
  } else {
    connection.query(`SELECT * FROM services`, (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    });
  }
};

const getCategory = (params, callback) => {
  connection.query(`SELECT * FROM category`, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const getProductByCategory = (params, callback) => {
  connection.query(
    `SELECT * FROM services where category="${params.category}"`,
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const addProduct = (params, callback) => {
  connection.query(
    "insert into services (description,name_service,unit_price,image,category_id,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?,?)",
    [
      params.description,
      params.name,
      params.price,
      params.image,
      1,
      params.created_at,
      params.created_by_id,
      params.updated_at,
      params.created_by_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        callback({ message: "Something went wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const getDetailProduct = (params, callback) => {
  connection.query(
    `SELECT * FROM services WHERE id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Product not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateProduct = (params, callback) => {
  console.log(params);
  connection.query(
    `SELECT * FROM laundry_booking.services WHERE service_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Service not found!" }, null);
      } else {
        connection.query(
          "update services set description=?,name_service=?,unit_price=?,image=?,category_id=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where service_id=?",
          [
            params.description,
            params.name,
            params.price,
            params.image,
            1,
            params.created_at,
            params.created_by_id,
            params.updated_at,
            params.updated_by_id,
            params.id,
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

const deleteProduct = (params, callback) => {
  connection.query(
    `SELECT * FROM services WHERE service_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Product not found!" }, null);
      } else {
        connection.query(
          "delete from services where service_id=?",
          [params.id],
          (err, results) => {
            if (err) {
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

export default {
  getListProducts,
  getCategory,
  getProductByCategory,
  addProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
};
