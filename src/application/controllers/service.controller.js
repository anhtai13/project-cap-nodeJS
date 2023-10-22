import serviceService from "../services/service.service.js";

const searchServices = (request, response) => {
    const { name, page, limit } = request.query;

    serviceService.searchServices(
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

const addService = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const requestBody = request.body;
    const image = request.file;

    serviceService.addService(
        {
            ...requestBody,
            authId: request.auth.service_id,
            image: image,
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

const getDetailService = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    serviceService.getDetailService(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result[0]);
        }
    });
};

const updateService = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const serviceId = request.params.id;

    const requestBody = request.body;

    const image = request.file;

    serviceService.updateService(
        serviceId,
        {
            ...requestBody,
            image: image,
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

const deleteService = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    serviceService.deleteService(id, (error, result) => {
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
    searchServices,
    addService,
    updateService,
    getDetailService,
    deleteService,
};
