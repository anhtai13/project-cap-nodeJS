import { validateIdDetailAndDelete, validatePrice } from "../../utils/validationServices.js";
import servicesRepositories from "../repositories/service.repositories.js";

const getListService = (params, callback) => {
    servicesRepositories.getListService(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const getServiceByCategory = (params, callback) => {
    servicesRepositories.getServiceByCategory(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
const getServiceCategory = (params, callback) => {
    servicesRepositories.getServiceCategory(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

const addService = (params, callback) => {
    if (!params.name_service && !params.description && !params.unit_price && !params.category_name) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.unit_price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        servicesRepositories.addService(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const getDetailService = (params, callback) => {
    if (!validateIdDetailAndDelete(params.service_id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        servicesRepositories.getDetailService(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const updateService = (params, callback) => {
    if (!params.name_service && !params.description && !params.category_name && !params.unit_price && !params.category_id) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.unit_price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        servicesRepositories.updateService(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const deleteService = (params, callback) => {
    if (!validateIdDetailAndDelete(params.service_id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        servicesRepositories.deleteService(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

export default {
    getListService,
    getServiceCategory,
    getServiceByCategory,
    addService,
    getDetailService,
    updateService,
    deleteService
}