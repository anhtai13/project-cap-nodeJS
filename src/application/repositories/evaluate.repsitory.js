import getConnection from "../../config/connection.database.js";
import moment from "moment";

const searchEvaluates = (params, callback) => {
    const connection = getConnection();

    let sql = " FROM evaluates";
    const bindParams = [];

    const page = params.page || 1;
    const limit = params.limit || 5;

    const offset = (page - 1) * limit;

    if (params.full_name) {
        const full_name = "%" + params.full_name + "%";
        sql += " WHERE full_name LIKE ?";
        bindParams.push(full_name);
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

const addEvaluates = (evaluates, callback) => {
    const connection = getConnection();

    const evaluatesToCreate = {
        ...evaluates,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    connection.query(
        "INSERT INTO evaluates SET ?",
        evaluatesToCreate,
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

const getDetailEvaluates = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT * FROM evaluates WHERE evaluate_id = ?",
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

const updateEvaluates = (evaluateId, params, callback) => {
    const connection = getConnection();

    let sql =
        "UPDATE evaluates SET full_name = ?, email = ?, content = ?, rate = ?, updated_by_id = ?";
    let bindParams = [
        params.full_name,
        params.email,
        params.content,
        params.rate,
        params.updated_id,
    ];

    if (params.image) {
        sql += ", image = ?";
        bindParams.push(params.image);
    }

    sql += " WHERE evaluate_id = ?";
    bindParams.push(evaluateId);

    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

    connection.end();
};

const deleteEvaluates = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "DELETE FROM evaluates WHERE evaluate_id = ?",
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
    searchEvaluates,
    addEvaluates,
    updateEvaluates,
    getDetailEvaluates,
    deleteEvaluates,
};
