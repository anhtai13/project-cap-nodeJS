import getConnection from "../../config/connection.database.js";
import moment from "moment";

const searchServices = (params, callback) => {
    const connection = getConnection();

    let sql = " FROM Services";
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
                "SELECT *" + sql + ` LIMIT ${limit} OFFSET ${offset}`;
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

const addService = (Service, callback) => {
    const connection = getConnection();

    const ServiceToCreate = {
        ...Service,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    connection.query(
        "INSERT INTO Services SET ?",
        ServiceToCreate,
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

const getDetailService = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT * FROM Services WHERE Service_id = ?",
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

const updateService = (serviceId, params, callback) => {
    const connection = getConnection();

    let sql =
        "UPDATE services SET name = ?, description = ?, category = ?, unit_price = ?, updated_by_id = ?";
    let bindParams = [
        params.name,
        params.description,
        params.category,
        params.unit_price,
        params.updated_by_id,
    ];

    if (params.image) {
        sql += ", image = ?";
        bindParams.push(params.image);
    }

    sql += " WHERE service_id = ?";
    bindParams.push(serviceId);

    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

    connection.end();
};

const deleteService = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "DELETE FROM services WHERE service_id = ?",
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
    searchServices,
    addService,
    updateService,
    getDetailService,
    deleteService,
};
