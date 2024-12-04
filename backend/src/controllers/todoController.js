const Todo = require('../models/Todo');

const addTodo = async (req, res) => {
    const { title, description, tags } = req.body;
  
    try {
      const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;
      const attachments = req.files?.attachments
        ? req.files.attachments.map((file) => file.path)
        : [];
  
      const todo = await Todo.create({
        userId: req.user.id,
        title,
        description,
        tags,
        thumbnail,
        attachments,
      });
  
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

  const getTodos = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
  
    try {
      const query = {
        userId: req.user.id,
      };
  
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
  
      const todos = await Todo.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
  
      const total = await Todo.countDocuments(query);
  
      res.status(200).json({
        todos,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, thumbnail, attachments, completed } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, tags, thumbnail, attachments, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    res.status(200).json({ message: 'To-Do deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { addTodo, getTodos, updateTodo, deleteTodo };
