const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.post('/', protect, addTodo);
router.get('/', protect, getTodos);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

module.exports = router;
