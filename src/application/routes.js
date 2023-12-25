import { Router } from "express";
import userController from "./controllers/user.controller.js";
import productController from "./controllers/product.controller.js";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";
import orderDetailController from "./controllers/orderDetail.controller.js";
import contactController from "./controllers/contact.controller.js";

const router = Router();

//Authentication
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// User management
router.get("/users", userController.searchUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getDetailUser);
router.put("/users", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Product management
router.get("/category", productController.getCategory);
router.get("/category/:category", productController.getProductByCategory);
router.get("/product", productController.getListProducts);
router.post("/product", productController.addProduct);
router.get("/product/:id", productController.getDetailProduct);
router.put("/product", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

// Order management
router.get("/order", orderController.getListOrder);
router.get("/order_total/:id", orderController.getOrderTotalPrice);
router.post("/order", orderController.addOrder);
router.get("/order/:id", orderController.getDetailOrder);
router.get("/order_id/:id", orderController.getDetailOrderById);
router.put("/order", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);

// Order Details management
router.post("/order_details", orderDetailController.getListOrderDetail);
router.get("/order_details/:id", orderDetailController.getOrderDetailById);

// Contact management
router.get("/contact", contactController.getListContact);
router.get("/contact/:id", contactController.getDetailContact);
router.post("/contact", contactController.addContact);
router.put("/contact", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);
export default router;
