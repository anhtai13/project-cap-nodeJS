import getConnection from '../../config/connection.database.js'
import bcrypt from 'bcryptjs'

const connection = getConnection();
let limitDefault = 5
let offsetDefault = 0
let salt = bcrypt.genSaltSync(10);

const searchUsers = (params, callback) => {
    if (params.limit && params.offset) {
        limitDefault = params.limit
        offsetDefault = params.offset
        if (params.name) {
            const safeParam = params.name.replace("'", "\\'")
            connection.query(`SELECT * FROM users WHERE username LIKE '%${safeParam}%' LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortName) {
            connection.query(`SELECT * FROM users order by username ${params.sortName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortRole) {
            connection.query(`SELECT * FROM users order by role ${params.sortRole} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortLastName) {
            connection.query(`SELECT * FROM users order by role ${params.sortLastName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else {
            connection.query(`SELECT * FROM users`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                }
                else {
                    callback(null, results);
                }
            });
        }
    } else {
        if (params.name) {
            const safeParam = params.name.replace("'", "\\'")
            connection.query(`SELECT * FROM users WHERE username LIKE '%${safeParam}%' LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortName) {
            connection.query(`SELECT * FROM users order by username ${params.sortName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortRole) {
            connection.query(`SELECT * FROM users order by role ${params.sortRole} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else if (params.sortLastName) {
            connection.query(`SELECT * FROM users order by role ${params.sortLastName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong!" }, null);
                } else if (results.length == 0) {
                    callback({ message: "User not found" }, null)
                }
                else {
                    callback(null, results);
                }
            });
        } else {
            connection.query(`SELECT * FROM users`, (error, results) => {
                if (error) {
                    callback({ message: "Something wrong1!" }, null);
                }
                else {
                    callback(null, results);
                }
            });
        }
    }
}

const addUser = (params, callback) => {
    const hashedPassword = bcrypt.hashSync(params.password, salt)
    connection.query('SELECT * FROM users WHERE username = ?', [params.username], (err, results) => {
        if (err) {
            callback({ message: "Something wrong!" }, null)
        }

        if (results.length > 0) {
            callback({ message: 'Username đã tồn tại' }, null)
        } else {
            connection.query(
                'insert into users (username,email,password,first_name,last_name,role,avatar,created_at,updated_at,created_by_id,updated_by_id,api_key,status,address_user,phone_number) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [params.username, params.email, hashedPassword, params.first_name, params.last_name, params.role, params.avatar, params.created_at, params.updated_at, params.created_by_id, params.updated_by_id, null, params.status, params.address_user, params.phone_number],
                (err, results) => {
                    if (err) {
                        callback({ message: "Something went wrong!" }, null);
                    } else {
                        callback(null, results);
                    }
                }
            );
        }
    })
}

const getDetailUser = (params, callback) => {
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "User not found" }, null)
        } else {
            callback(null, results);
        }
    }
    )
}

const updateUser = (params, callback) => {
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "User not found" }, null)
        } else {
            connection.query("update users set username=?,email=?,password=?,first_name=?,last_name=?,role=?,avatar=?,created_at=?,updated_at=?,created_by_id=?,updated_by_id=? where id=?",
                [params.username, params.email, params.password, params.first_name,
                params.last_name, params.role, params.avatar, params.created_at, params.updated_at,
                params.created_by_id, params.updated_by_id, params.id], (err, results) => {
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

const deleteUser = (params, callback) => {
    connection.query(`SELECT * FROM users WHERE id=?`, [params.id], (error, results, fields) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        } else if (results.length == 0) {
            callback({ message: "User not found" }, null)
        } else {
            connection.query("delete from users where id=?", [params.id], (err, results) => {
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
    searchUsers,
    addUser,
    getDetailUser,
    updateUser,
    deleteUser
}