import e from "cors";
import evaluateService from "../services/evaluate.service.js";

const searchEvaluates = (request, response) => {
    const { name, page, limit } = request.query;

    evaluateService.searchEvaluates(
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

const addEvaluates = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const requestBody = request.body;
    const image = request.file;

    evaluateService.addEvaluates(
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

const getDetailEvaluates = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    evaluateService.getDetailEvaluates(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.send(result[0]);
        }
    });
};

const updateEvaluates = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const evaluateId = request.params.id;

    const requestBody = request.body;

    evaluateService.updateEvaluates(
        evaluateId,
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

const deleteEvaluates = (request, response) => {
    if (request.auth.role !== 1) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }

    const { id } = request.params;

    evaluateService.deleteEvaluates(id, (error, result) => {
        if (error) {
            response.status(500).send({
                error: error.message,
            });
        } else {
            response.status(204).send();
        }
    });
};
// get rate evaluates controller
const getRateEvaluates = (request, response) => {
    evaluateService.getRateEvaluates((error, result) => {
        if(error){
            response.status(500).send({
                error: error.message,
            });
        }else {
            response.status(200).send();
        }
    });
};
// add rate evaluates controller
const addRateEvaluates = (request, response) => {
    if (request.auth.role !== 2) {
        response.status(403).send({
            error: "Không có quyền truy cập",
        });
        return;
    }
    const { user_id , rate } = request.params;
    evaluateService.addRateEvaluates(user_id,rate, (error,result) =>{
        if(error){
            response.status(500).send({
                error: error.message,
            });
        }else{
            response.status(201).send();
        }
    });
};

export default {
    searchEvaluates,
    addEvaluates,
    updateEvaluates,
    getDetailEvaluates,
    deleteEvaluates,
    getRateEvaluates,
    addRateEvaluates,
};
