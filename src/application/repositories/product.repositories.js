import getConnection from "../../config/connection.database.js";

const connection = getConnection();
let limitDefault = 5
let offsetDefault = 0
const getListProducts = (params, callback) => {
    if (params.limit && params.offset) {
        limitDefault = params.limit
        offsetDefault = params.offset
        connection.query(`SELECT * FROM services LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
            if (error) {
                callback({ message: "Something wrong!" }, null);
            }
            else {
                callback(null, results);
            }
        });
    } else {
        connection.query(`SELECT * FROM services`, (error, results) => {
            if (error) {
                callback({ message: "Something wrong!" }, null);
            }
            else {
                callback(null, results);
            }
        });
    }
}

const getCategory = (params, callback) => {
    connection.query(`SELECT * FROM category`, (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const getProductByCategory = (params, callback) => {
    connection.query(`SELECT * FROM services where category="${params.category}"`, (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}
const addProduct = (params, callback) => {
    connection.query(
        'insert into services (name,sku,unit_price,category,description,image,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?,?,?)',
        [params.name, params.sku, params.price, params.category, params.description, params.image, params.created_at, params.created_by_id, params.updated_at, params.updated_by_id],
        (err, results) => {
            if (err) {
                callback({ message: "Something went wrong!" }, null);
            } else {
                callback(null, results);
            }
        }
    );
}

const getDetailProduct = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Product not found!" }, null)
        } else {
            callback(null, results);
        }
    }
    )
}

const updateProduct = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Product not found!" }, null)
        } else {
            connection.query("update services set name=?,sku=?,quantity=?,price=?,category=?,description=?,image=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where id=?",
                [params.name, params.sku, params.quantity, params.price,
                params.category, params.description, params.image, params.created_at, params.created_by_id,
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

const deleteProduct = (params, callback) => {
    connection.query(`SELECT * FROM services WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "Product not found!" }, null)
        } else {
            connection.query("delete from services where id=?", [params.id], (err, results) => {
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

export default {
    getListProducts,
    getCategory,
    getProductByCategory,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}