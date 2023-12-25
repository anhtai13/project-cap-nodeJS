import productService from "../services/product.service.js";

const getListProducts = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    productService.getListProducts({ limit, offset }, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getCategory = (req, res) => {
    productService.getCategory("", (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getProductByCategory = (req, res) => {
    const category = req.params
    productService.getProductByCategory(category, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}
const addProduct = (req, res) => {
    const newProduct = req.body
    productService.addProduct(newProduct, (err, product) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(product);
        }
    })
}

const getDetailProduct = (req, res) => {
    const { id } = req.params;
    productService.getDetailProduct({ id }, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(201).send(result[0]);
        }
    })
}

const updateProduct = (req, res) => {
    const productUpdate = req.body

    productService.updateProduct(productUpdate, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            res.status(202).send("Success");
        }
    })
}

const deleteProduct = (req, res) => {
    const { id } = req.params;

    productService.deleteProduct({ id }, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(204).send("Success");
        }
    })
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