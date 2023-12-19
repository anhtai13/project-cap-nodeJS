import { Router } from "express";
import userController from "./controllers/user.controller.js";
import productController from "./controllers/product.controller.js";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";
import orderDetailController from "./controllers/orderDetail.controller.js";
import contactController from "./controllers/contact.controller.js";

const router = Router();

//Authentication
router.post('/login', authController.login)
router.post('/logout', authController.logout)

// User management
router.get('/users', userController.searchUsers);
router.post('/users', userController.addUser);
router.get('/users/:id', userController.getDetailUser);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Service management
router.get('/category', serviceController.getServiceCategory)
router.get('/category/:category_name', serviceController.getServiceByCategory);
router.get('/service', serviceController.getListService);
router.post('/service', serviceController.addService);
router.get('/service/:service_id', serviceController.getDetailService);
router.put('/service', serviceController.updateService);
router.delete('/service/:service_id', serviceController.deleteService);

// Order management
router.get('/order', orderController.getListOrder);
router.get('/order_total', orderController.getOrderTotalPrice);
router.post('/order', orderController.addOrder);
router.get('/order/:id', orderController.getDetailOrder);
router.get('/order_id/:id', orderController.getDetailOrderById)
router.put('/order', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

// Order Details management
router.post('/order_details', orderDetailController.getListOrderDetail)
router.get('/order_details/:id', orderDetailController.getOrderDetailById)

// Evaluate management
router.get('/evaluate', evaluateController.getListEvaluate)
router.get('/evaluate/:id', evaluateController.getDetailEvaluate)
router.post('/evaluate', evaluateController.addEvaluate)
router.put('/evaluate', evaluateController.updateEvaluate)
router.delete('/evaluate/:id', evaluateController.deleteEvaluate)
export default router;