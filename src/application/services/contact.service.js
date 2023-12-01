import contactRepositories from "../repositories/contact.repositories.js";

const getListContact = (params, callback) => {
    contactRepositories.getListContact(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const getDetailContact = (params, callback) => {
    contactRepositories.getDetailContact(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const addContact = (params, callback) => {
    contactRepositories.addContact(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const updateContact = (params, callback) => {
    contactRepositories.updateContact(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const deleteContact = (params, callback) => {
    contactRepositories.deleteContact(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

export default {
    getListContact,
    addContact,
    updateContact,
    getDetailContact,
    deleteContact
}