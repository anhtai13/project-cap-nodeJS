import mysql from "mysql";

const getConnection = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "laundry_booking",
  });
};

export default getConnection;
