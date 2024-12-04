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
    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      required: false,
    },
    attachments: {
      type: [String],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model('Todo', todoSchema);
