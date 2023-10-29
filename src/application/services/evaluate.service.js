import evaluateRepository from "../repositories/evaluate.repsitory.js";
import fs from "fs";
import { getFileExtension } from "../../utilities/upload.util.js";

const searchEvaluates = (params, callback) => {
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit is number" }, null);
    } else if (params.pager && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page is number" }, null);
    } else {
        evaluateRepository.searchEvaluates(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const addEvaluates = (requestBody, callback) => {
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
        const newEvaluate = {
            full_name: requestBody.full_name,
            email: requestBody.email,
            status: requestBody.status,
            content: requestBody.content,
            created_id: requestBody.authId,
            updated_id: requestBody.authId,
        };

        evaluateRepository.addEvaluates(newEvaluate, (error, result) => {
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

const updateEvaluates = (evaluateId, requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();

        // Validate name product
        if (!params.full_name) {
            errors.set("full_name", "Tên người dùng không được bỏ trống.");
        } else if (typeof params.full_name !== "string") {
            errors.set("full_name", "Tên người dùng phải là chuỗi.");
        }

        if (typeof params.status !== "string") {
            errors.set("rate", "Vai trò phải là kiểu số.");
        }

        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        const updateEvaluates = {
            full_namename: requestBody.full_name,
            email: requestBody.email,
            content: requestBody.content,
            rate: requestBody.rate,
            updated_by_id: requestBody.authId,
        };

        evaluateRepository.updateEvaluates(
            evaluateId,
            updateEvaluates,
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

const getDetailEvaluates = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        evaluateRepository.getDetailEvaluates(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: "evaluate not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const deleteEvaluates = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        evaluateRepository.deleteEvaluates(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({ message: "evaluate not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};
// get rate evaluates
const getRateEvaluates = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        evaluateRepository.getRateEvaluates(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: "evaluate not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};
// add rate evaluates 
const addRateEvaluates = (requestBody, callback) => {
    const validate = (params) => {
        let errors = new Map();

        // Validate user ID
        if (!params.user_id) {
            errors.set("user_id", "ID người dùng không được bỏ trống.");
        } else if (!/^[0-9]+$/.test(params.user_id)) {
            errors.set("user_id", "ID người dùng phải là số.");
        }

        // Validate rating
        if (!params.rating) {
            errors.set("rating", "Đánh giá không được bỏ trống.");
        } else if (typeof params.rating !== "number" || params.rating < 1 || params.rating > 5) {
            errors.set("rating", "Đánh giá phải là một số từ 1 đến 5.");
        }

        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        const newRating = {
            user_id: requestBody.user_id,
            rating: requestBody.rating,
        };

        // Gọi phương thức addRating của evaluateRepositoryRepository (bạn cần xác định đúng tên thực tế)
        evaluateRepository.addRating(newRating, (error, result) => {
            if (error) {
                callback(error, result);
            } else {
                callback(null, result);
            }
        });
    }
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
