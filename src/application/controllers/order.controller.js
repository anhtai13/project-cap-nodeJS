import orderService from "./../services/order.service.js";

const searchOrders = (request, response) => {
    const { name, page, limit } = request.query;

    orderService.searchOrders(
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

const addOrder = (request, response) => {
    if (request.auth.role !== 2) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const requestBody = request.body;

    orderService.addOrder(
        {
            cart: requestBody.cart,
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

const getDetailOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    orderService.getDetailOrder(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result[0]);
        }
    });
};

const getDetailOrderDetail = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    orderService.getDetailOrderDetail(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result);
        }
    });
};

const updateOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const ordertId = request.params.id;

    const requestBody = request.body;

    orderService.updateOrder(
        ordertId,
        {
            ...requestBody,
        },
        (error, result) => {
            if (error) {
                response.status(500).send({
                    error: error,
                });
            } else {
                response.status(200).send();
            }
        }
    );
};

const deleteOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    orderService.deleteOrder(id, (error, result) => {
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
    searchOrders,
    addOrder,
    updateOrder,
    getDetailOrder,
    getDetailOrderDetail,
    deleteOrder,
};
