import mysql from "mysql";

const getConnection = () => {
    return mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "password",
        database: "laudry_booking_v1_1",
    });
};

export default getConnection;
