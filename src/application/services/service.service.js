import serviceRepository from "../repositories/service.repository.js";
import fs from "fs";
import { getFileExtension } from "../../utilities/upload.util.js";

const searchServices = (params, callback) => {
    if (params.limit && !/^[0-9]+$/.test(params.limit)) {
        callback({ message: "Limit is number" }, null);
    } else if (params.pager && !/^[0-9]+$/.test(params.page)) {
        callback({ message: "Page is number" }, null);
    } else {
        serviceRepository.searchServices(params, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const addService = (requestBody, callback) => {
    let originalName = null;
    let path = null;

    if (requestBody.image) {
        originalName = requestBody.image.originalname;
        path = requestBody.image.path;
    }

    const validate = (params) => {
        let errors = new Map();

        // Validate name service
        if (!params.name_service) {
            errors.set("name_service", "Tên sản phẩm không được bỏ trống.");
        } else if (typeof params.name_service !== "string") {
            errors.set("name_service", "Tên sản phẩm phải là chuỗi.");
        }

        if (typeof params.category_id !== "string") {
            errors.set("category_id", "Vai trò phải là chuỗi.");
        } else if (
            params.category_id !== "1" &&
            params.category_id !== "2" &&
            params.category_id !== "3"
        ) {
            errors.set("category_id", "Vai trò chỉ cho phép nhập 1 hoặc 2 hoặc 3");
        }
        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let image = null;

        if (requestBody.image) {
            const imageExtension = getFileExtension(originalName);
            image = `image${requestBody.image}.${imageExtension}`;
            const imageLocation = `./public/${image}`;

            // Copy uploaded file to saving loacation
            fs.cpSync(path, imageLocation);
        }

        const newService = {
            name_service: requestBody.name_service,
            category_id: requestBody.category_id,
            description: requestBody.description,
            unit_price: requestBody.unit_price,
            image: image,
            create_by_id: requestBody.authId,
            updated_by_id: requestBody.authId,
        };

        serviceRepository.addService(newService, (error, result) => {
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

const updateService = (serviceId, requestBody, callback) => {
    let originalName = null;
    let path = null;

    if (requestBody.image) {
        originalName = requestBody.image.originalname;
        path = requestBody.image.path;
    }

    const validate = (params) => {
        let errors = new Map();

        // Validate name service
        if (!params.name_service) {
            errors.set("name_service", "Tên sản phẩm không được bỏ trống.");
        } else if (typeof params.name_service !== "string") {
            errors.set("name_service", "Tên sản phẩm phải là chuỗi.");
        }

        if (typeof params.category_id !== "string") {
            errors.set("category_id", "Vai trò phải là chuỗi.");
        } else if (
            params.category_id !== "1" &&
            params.category_id !== "2" &&
            params.category_id !== "3"
        ) {
            errors.set("category", "Vai trò chỉ cho phép nhập 1, 2, 3.");
        }

        return errors;
    };

    const validateErrors = validate(requestBody);

    if (validateErrors.size !== 0) {
        callback(Object.fromEntries(validateErrors), null);
    } else {
        let image = null;

        if (requestBody.image) {
            const imageExtension = getFileExtension(originalName);
            image = `image/${requestBody.name}.${imageExtension}`;
            const imageLocation = `./public/${image}`;

            // Copy upload file to saving location
            fs.cpSync(path, imageLocation);
        }

        const updateService = {
            name_service: requestBody.name_service,
            category_id: requestBody.category_id,
            description: requestBody.description,
            unit_price: requestBody.unit_price,
            image: image,
            updated_by_id: requestBody.authId,
        };

        serviceRepository.updateService(
            serviceId,
            updateService,
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

const getDetailService = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        serviceRepositoryRepository.getDetailService(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.length === 0) {
                callback({ message: "Service not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

const deleteService = (id, callback) => {
    if (!/^[0-9]+$/.test(id)) {
        callback({ message: "ID phải là số" }, null);
    } else {
        serviceRepository.deleteService(id, (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.affectedRows === 0) {
                callback({ message: "Service not found" }, null);
            } else {
                callback(null, result);
            }
        });
    }
};

export default {
    searchServices,
    addService,
    updateService,
    getDetailService,
    deleteService,
};
