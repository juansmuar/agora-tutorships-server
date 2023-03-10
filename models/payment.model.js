const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    customerId: {
      type: String,
    },
    refId: {
      type: String,
      unique: true,
      required: true,
    },
    descripcion: {
      type: String,
    },
    valor: {
      type: Number,
      required: true,
    },
    iva: {
      type: Number,
    },
    valorneto: {
      type: Number,
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('payments', PaymentSchema);

module.exports = Payment;
