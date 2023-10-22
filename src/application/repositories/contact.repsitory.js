import getConnection from "../../config/connection.database.js";
import moment from "moment";

const searchContacts = (params, callback) => {
    const connection = getConnection();

    let sql = " FROM contacts";
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

const addContact = (contact, callback) => {
    const connection = getConnection();

    const contactToCreate = {
        ...contact,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    connection.query(
        "INSERT INTO contacts SET ?",
        contactToCreate,
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

const getDetailContact = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "SELECT * FROM contacts WHERE contact_id = ?",
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

const updateContact = (contactId, params, callback) => {
    const connection = getConnection();

    let sql =
        "UPDATE contacts SET full_name = ?, email = ?, content = ?, status = ?, updated_id = ?";
    let bindParams = [
        params.full_name,
        params.email,
        params.content,
        params.status,
        params.updated_id,
    ];

    if (params.image) {
        sql += ", image = ?";
        bindParams.push(params.image);
    }

    sql += " WHERE contact_id = ?";
    bindParams.push(contactId);

    connection.query(sql, bindParams, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

    connection.end();
};

const deleteContact = (id, callback) => {
    const connection = getConnection();

    connection.query(
        "DELETE FROM contacts WHERE contact_id = ?",
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
    searchContacts,
    addContact,
    updateContact,
    getDetailContact,
    deleteContact,
};
