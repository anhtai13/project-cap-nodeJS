import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListContact = (params, callback) => {
  connection.query(`SELECT * FROM contacts`, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const getDetailContact = (params, callback) => {
  connection.query(
    `SELECT * FROM contacts where id=?`,
    [+params],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
};

const addContact = (params, callback) => {
  connection.query(
    `insert into contacts (full_name,email,content,status,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?)`,
    [
      params.full_name,
      params.email,
      params.content,
      params.status,
      params.created_at,
      params.created_by_id,
      params.updated_at,
      params.updated_by_id,
    ],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateContact = (params, callback) => {
  connection.query(
    `SELECT * FROM contacts  WHERE id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Contact not found!" }, null);
      } else {
        connection.query(
          "update contacts set full_name=?,email=?,content=?,status=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where id=?",
          [
            params.full_name,
            params.email,
            params.content,
            params.status,
            params.created_at,
            params.created_by_id,
            params.updated_at,
            params.updated_by_id,
            params.id,
          ],
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

const deleteContact = (params, callback) => {
  connection.query(
    `SELECT * FROM contacts  WHERE id=?`,
    [+params],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Contact not found!" }, null);
      } else {
        connection.query(
          "delete from contacts where id=?",
          [+params],
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
  getListContact,
  addContact,
  updateContact,
  getDetailContact,
  deleteContact,
};
