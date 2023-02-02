/* eslint-disable no-shadow */
const epayco = require('epayco-sdk-node')({
  apiKey: 'a4aa69c0913124a45aaf2ff8dd0e031d',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

const Student = require('../models/student.model');
const Payment = require('../models/payment.model');
const Tutorship = require('../models/tutorship.model');

async function addCard(req, res) {
  // first creates card using card info
  // then uses to add the card to new user
  // tokenCard
  // customerId
  const { cardInfo, epaycoCustomerId: customerId } = req.body;
  try {
    const token = await epayco.token.create(cardInfo);
    const { id: tokenCard } = token;
    const addCustomerInfo = { customerId, tokenCard };
    const updatedCustomer = await epayco.customers.addNewToken(addCustomerInfo);
    res.status(201).json({ updatedCustomer });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteCard(req, res) {
  // uses franchise, mask, and customerid
  // franchise : "visa",
  // mask : "457562******0326",
  // customerId:"id_customer"
  const { epaycoCustomerId: customerId, franchise, mask } = req.body;
  const deleteCustomerInfo = { customerId, franchise, mask };
  try {
    const customer = await epayco.customers.delete(deleteCustomerInfo);
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getCustomer(req, res) {
  const { id } = req.query;
  try {
    const student = await Student.findOne({ _id: id });
    const { epaycoCustomerId: customerId } = student;
    const customer = await epayco.customers.get(customerId);
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function payment(req, res) {
  const {
    tutorshipId, cardInfo, customerInfo, userId, paymentInfo, currentPaymentData,
  } = req.body;
  try {
    if (!currentPaymentData) {
      // get card token
      const token = await epayco.token.create(cardInfo);
      const { id: tokenCard } = token;
      // get created customer
      const customer = await epayco.customers.create({ ...customerInfo, tokenCard });
      const {
        data: { customerId },
      } = customer;
      const filter = { _id: userId };
      const update = { epaycoCustomerId: customerId };
      // add the epayco Customer id
      const updatedStudent = await Student.updateOne(filter, update);
      // make payment
      const { data: charge } = await epayco.charge.create({
        ...paymentInfo, ...customerInfo, customerId, tokenCard,
      });

      // save payment schema
      const newPayment = new Payment({
        ...charge,
        studentId: userId,
        epaycoCustomerId: customerId,
      });
      const payment = await newPayment.save();

      // update tutorship status
      const filterTutorship = { _id: tutorshipId };
      const updateTutorship = { status: 'accepted' };
      const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

      res.status(201).json({ payment, updatedStudent, updatedTutorship });
    } else {
      // make payment
      const { data: charge } = await epayco.charge.create(currentPaymentData);

      // save payment schema
      const newPayment = new Payment({
        ...charge,
        studentId: userId,
        epaycoCustomerId: currentPaymentData.customerId,
      });
      const payment = await newPayment.save();

      // update tutorship status
      const filterTutorship = { _id: tutorshipId };
      const updateTutorship = { status: 'accepted' };
      const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

      res.status(201).json({ payment, updatedTutorship });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  payment, addCard, getCustomer, deleteCard,
};
