const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    attachments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model('Todo', todoSchema);
