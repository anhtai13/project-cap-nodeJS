import { Router } from "express";
import multer from "multer";
import authMiddleware from "./middlewares/auth.middleware.js";
import authController from "./controllers/auth.controller.js";
import uploadConfig from "../config/upload.config.js";
import userController from "./controllers/user.controller.js";
import orderController from "./controllers/order.controller.js";
import contactController from "./controllers/contact.controller.js";
import serviceController from "./controllers/service.controller.js";
import evaluateController from "./controllers/evaluate.controller.js";

const upload = multer(uploadConfig);

const router = Router();

router.use(authMiddleware);

// Authentication
router.post("/login", authController.login);
router.get("/auth", authController.getAuth); // Lấy thông tin người dùng
router.post("/logout", authController.logout);
router.post("/register", authController.register);

// users management
router.get("/users", userController.searchUsers);
router.get("/users/new", userController.viewAddUser);
router.post("/users", upload.single("avatar"), userController.addUser);
router.get("/users/:id", userController.getDetailUser);
router.put("/users/:id", upload.single("avatar"), userController.updateUser);
router.delete("/users/:id", userController.deleteUser);


// services management
router.get("/services", serviceController.searchServices);
router.post("/services", upload.single("image"), serviceController.addService);
router.get("/services/:id", serviceController.getDetailService);
router.put("/services/:id",upload.single("image"),serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// orders management
router.get("/orders", orderController.searchOrders);
router.post("/orders", orderController.addOrder);
router.get("/orders/detail/:id", orderController.getDetailOrderDetail);
router.get("/orders/:id", orderController.getDetailOrder);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

// contacts management
router.get("/contacts", contactController.searchContacts);
router.post("/contacts", contactController.addContact);
router.get("/contacts/:id", contactController.getDetailContact);
router.put("/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);
// evaluates management
router.get("/evaluates", evaluateController.searchEvaluates);
router.post("/evaluates", evaluateController.addEvaluates);
router.get("/evaluates/:id", evaluateController.getDetailEvaluates);
router.put("/evaluates/:id", evaluateController.updateEvaluates);
router.delete("/evaluates/:id", evaluateController.deleteEvaluates);
router.get("/evaluates/:id", evaluateController.getRateEvaluates);
router.post("/evaluates/:user_id/:rate", evaluateController.addRateEvaluates);

export default router;
