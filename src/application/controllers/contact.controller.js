import contactService from "./../services/contact.service.js";

const searchContacts = (request, response) => {
    const { name, page, limit } = request.query;

    contactService.searchContacts(
        { name: name, page: page, limit: limit },
        (error, result) => {
            if (error) {
                response.status(500).send({
                    error: error.message,
                });
            } else {
                response.send(result);
            }
        }
    );
};

const addContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const requestBody = request.body;
    const image = request.file;

    contactService.addContact(
        {
            ...requestBody,
            authId: request.auth.id,
        },
        (error, result) => {
            if (error) {
                response.status(500).send({ error: error });
            } else {
                response.status(201).send();
            }
        }
    );
};

const getDetailContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    contactService.getDetailContact(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result[0]);
        }
    });
};

const updateContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const contactId = request.params.id;

    const requestBody = request.body;

    contactService.updateContact(
        contactId,
        {
            ...requestBody,
        },
        (error, result) => {
            if (error) {
                response.status(500).send({
                    error: error.message,
                });
            } else {
                response.status(200).send();
            }
        }
    );
};

const deleteContact = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    contactService.deleteContact(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.status(204).send();
        }
    });
};

export default {
    searchContacts,
    addContact,
    updateContact,
    getDetailContact,
    deleteContact,
};
