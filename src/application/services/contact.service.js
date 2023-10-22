import contactRepository from "../repositories/contact.repsitory.js";
import fs from "fs";
import { getFileExtension } from "../../utilities/upload.util.js";

const searchContacts = (params, callback) => {
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit is number" }, null);
    } else if (params.pager && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page is number" }, null);
    } else {
        contactRepository.searchContacts(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const addContact = (requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();

        // Validate name product
        if (!params.full_name) {
            errors.set("full_name", "Tên người dùng không được bỏ trống.");
        } else if (typeof params.full_name !== "string") {
            errors.set("full_name", "Tên người dùng phải là chuỗi.");
        }
        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        const newContact = {
            full_name: requestBody.full_name,
            email: requestBody.email,
            status: requestBody.status,
            content: requestBody.content,
            created_id: requestBody.authId,
            updated_id: requestBody.authId,
        };

        contactRepositoryRepository.addContact(newContact, (error, result) => {
            if (path) {
                fs.rmSync(path);
            }
            if (error) {
                callback(error, result);
            } else {
                callback(null, result);
            }
        });
    }
};

const updateContact = (contactId, requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();

        // Validate name product
        if (!params.full_name) {
            errors.set("full_name", "Tên người dùng không được bỏ trống.");
        } else if (typeof params.full_name !== "string") {
            errors.set("full_name", "Tên người dùng phải là chuỗi.");
        }

        if (typeof params.status !== "string") {
            errors.set("status", "Vai trò phải là chuỗi.");
        } else if (params.category !== "1" && params.category !== "2") {
            errors.set("category", "Vai trò chỉ cho phép nhập 1, 2");
        }

        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        const updateContact = {
            sku: requestBody.sku,
            name: requestBody.name,
            category: requestBody.category,
            description: requestBody.description,
            unit_price: requestBody.unit_price,
            updated_by_id: requestBody.authId,
        };

        contactRepository.updateContact(
            contactId,
            updateContact,
            (error, result) => {
                if (path) {
                    fs.rmSync(path);
                }
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            }
        );
    }
};

const getDetailContact = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        contactRepository.getDetailContact(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: "Contact not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const deleteContact = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        contactRepository.deleteContact(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({ message: "Contact not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

export default {
    searchContacts,
    addContact,
    updateContact,
    getDetailContact,
    deleteContact,
};
