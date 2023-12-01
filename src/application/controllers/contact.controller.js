import contactService from "../services/contact.service.js";

const getListContact = (req, res) => {
    contactService.getListContact("", (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getDetailContact = (req, res) => {
    const { id } = req.params;
    contactService.getDetailContact(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const addContact = (req, res) => {
    const newOrder = req.body
    contactService.addContact(newOrder, (err, order) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(order.message);
        }
    })
}

const updateContact = (req, res) => {
    const newOrder = req.body
    contactService.updateContact(newOrder, (err, order) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(order.message);
        }
    })
}

const deleteContact = (req, res) => {
    const { id } = req.params;
    contactService.deleteContact(id, (err, order) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(order.message);
        }
    })
}
export default {
    getListContact,
    addContact,
    updateContact,
    getDetailContact,
    deleteContact
}