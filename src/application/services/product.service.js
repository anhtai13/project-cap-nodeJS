import { validateIdDetailAndDelete, validatePrice } from "../../utils/validationProduct.js";
import productRepositories from "../repositories/product.repositories.js";

const getListProducts = (params, callback) => {
    productRepositories.getListProducts(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const getProductByCategory = (params, callback) => {
    productRepositories.getProductByCategory(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
const getCategory = (params, callback) => {
    productRepositories.getCategory(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

const addProduct = (params, callback) => {
    if (!params.name && !params.sku && !params.price && !params.category) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        productRepositories.addProduct(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const getDetailProduct = (params, callback) => {
    if (!validateIdDetailAndDelete(params.id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        productRepositories.getDetailProduct(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const updateProduct = (params, callback) => {
    if (!params.name && !params.sku && !params.quantity && !params.price && !params.category) {
        callback({ message: "Vui lòng điền đầy đủ thông tin" }, null)
    } else if (!validatePrice(params.price)) {
        callback({ message: "Invalid price" }, null)
    } else {
        productRepositories.updateProduct(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

const deleteProduct = (params, callback) => {
    if (!validateIdDetailAndDelete(params.id)) {
        callback({ message: "Invalid id" }, null)
    } else {
        productRepositories.deleteProduct(params, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

export default {
    getListProducts,
    getCategory,
    getProductByCategory,
    addProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
}