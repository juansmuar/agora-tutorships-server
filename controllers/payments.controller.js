/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const Stripe = require('stripe');
const Student = require('../models/student.model');
const Payment = require('../models/payment.model');
const Tutorship = require('../models/tutorship.model');

const secret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(secret, { apiVersion: '2022-11-15' });

// async function addCard(req, res) {
//   // first creates card using card info
//   // then uses to add the card to new user
//   // tokenCard
//   // customerId
//   const { cardInfo, epaycoCustomerId: customerId } = req.body;
//   try {
//     const token = await epayco.token.create(cardInfo);
//     const { id: tokenCard } = token;
//     const addCustomerInfo = { customerId, tokenCard };
//     const updatedCustomer = await epayco.customers.addNewToken(addCustomerInfo);
//     res.status(201).json({ updatedCustomer });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// async function deleteCard(req, res) {
//   // uses franchise, mask, and customerid
//   // franchise : "visa",
//   // mask : "457562******0326",
//   // customerId:"id_customer"
//   const { epaycoCustomerId: customerId, franchise, mask } = req.body;
//   const deleteCustomerInfo = { customerId, franchise, mask };
//   try {
//     const customer = await epayco.customers.delete(deleteCustomerInfo);
//     res.status(201).json({ customer });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// async function getCustomer(req, res) {
//   const { id } = req.query;
//   try {
//     const student = await Student.findOne({ _id: id });
//     const { epaycoCustomerId: customerId } = student;
//     const customer = await epayco.customers.get(customerId);
//     res.status(201).json({ customer });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

async function payment(req, res) {
  const {
    tutorshipId, customerInfo, userId, paymentInfo, paymentMethod,
  } = req.body;
  console.log(paymentInfo);
  try {
    // make payment
    const { id } = paymentMethod;
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount: (paymentInfo.value) / 100,
      currency: 'usd',
      confirm: true,
      description: `Tutorship: ${tutorshipId} with ${paymentInfo.tutor}`,
    });

    // save payment schema
    // const newPayment = new Payment({
    //   ...charge,
    //   studentId: userId,
    //   epaycoCustomerId: currentPaymentData.customerId,
    // });

    // update tutorship status
    const filterTutorship = { _id: tutorshipId };
    const updateTutorship = { status: 'accepted' };
    const updatedTutorship = await Tutorship.updateOne(filterTutorship, updateTutorship);

    res.status(201).json({ payment, updatedTutorship });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  payment,
  // addCard, getCustomer, deleteCard,
};
