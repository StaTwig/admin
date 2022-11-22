const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema(
  {
    counters: {
      type: Array,
      default: [
      ],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Counter', CounterSchema);
