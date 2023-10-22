import orderDetailService from "./../services/orderDetail.service.js";

const searchOrderDetails = (request, response) => {
    const { name, page, limit } = request.query;

    orderDetailService.searchOrderDetails(
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

const getDetailOrder = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    orderDetailService.getDetailOrder(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result[0]);
        }
    });
};

const deleteOrderDetail = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    orderDetailService.deleteOrderDetail(id, (error, result) => {
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
    searchOrderDetails,
    getDetailOrder,
    deleteOrderDetail,
};
