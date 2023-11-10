import getConnection from "./src/config/connection.database.js";
import { encryptPassword } from "./src/utilities/hash.util.js";

const connection = getConnection();

const adminUser = {
    username: "admin",
    email: "admin1@mail.com",
    first_name: "Phat",
    last_name: "Pham Cong",
    password: encryptPassword("Password123"),
    role:    1,
    avatar: "",
    address_user: "DN",
    phone_number: "012381239",
    created_at: "2022-12-12 12:12:12",
    created_by_id: 0,
    updated_at: "2022-12-12 12:12:12",
    updated_by_id: 0,
};

connection.query("INSERT INTO users SET ?", adminUser, (error, result) => {
    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Successed");
    }
});

connection.end();
