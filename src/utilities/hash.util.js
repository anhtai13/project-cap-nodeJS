import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/hash.config.js";

const encryptPassword = (value) => {
  return bcrypt.hashSync(value, SALT_ROUNDS);
};

const comparePassword = (value, encryptValue) => {
  return bcrypt.compareSync(value, encryptValue);
};

export { encryptPassword, comparePassword };
