const { Router } = require('express');
const controller = require('../controllers/payments.controller');

const payment = new Router();

payment.post('/payment', controller.payments);
// payment.post('/create-card', controller.addCard);
// payment.post('/delete-card', controller.deleteCard);
// payment.get('/get-customer/:id', controller.getCustomer);

module.exports = payment;
