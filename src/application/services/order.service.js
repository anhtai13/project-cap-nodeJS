import orderRepositories from "../repositories/order.repositories.js";

const getListOrder = (params, callback) => {
  orderRepositories.getListOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getOrderTotalPrice = (params, callback) => {
  orderRepositories.getOrderTotalPrice(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const addOrder = (params, callback) => {
  orderRepositories.addOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getDetailOrder = (params, callback) => {
  orderRepositories.getDetailOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getDetailOrderById = (params, callback) => {
  orderRepositories.getDetailOrderById(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const updateOrder = (params, callback) => {
  orderRepositories.updateOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const deleteOrder = (params, callback) => {
  orderRepositories.deleteOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderById,
};
