const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { check } = require('express-validator');
const { upload } = require('../middlewares/uploadMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { addTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.post(
  '/',
  protect,
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description must be at least 10 characters').optional().isLength({ min: 10 }),
    check('tags', 'Tags must be an array of strings').optional().isArray(),
  ],
  validateRequest,
  addTodo
);

router.put(
  '/:id',
  protect,
  [
    check('title', 'Title must be at least 3 characters').optional().isLength({ min: 3 }),
    check('completed', 'Completed must be a boolean').optional().isBoolean(),
  ],
  validateRequest,
  updateTodo
);

router.get('/', protect, getTodos);
router.delete('/:id', protect, deleteTodo);

router.post(
    '/',
    protect,
    upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'attachments', maxCount: 5 },
    ]),
    addTodo
  );

module.exports = router;
