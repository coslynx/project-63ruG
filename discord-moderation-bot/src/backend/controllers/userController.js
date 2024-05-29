const User = require('../models/user');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const newUser = new User({ username, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;