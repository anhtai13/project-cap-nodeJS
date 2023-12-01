import orderDetailServices from "../services/orderDetail.services.js";

const getListOrderDetail = (req, res) => {
    const id = req.body.id
    orderDetailServices.getListOrderDetail(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getOrderDetailById = (req, res) => {
    const id = req.body.id
    orderDetailServices.getOrderDetailById(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

export default {
    getListOrderDetail,
    getOrderDetailById
}