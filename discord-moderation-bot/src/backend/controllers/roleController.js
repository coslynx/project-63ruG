const Role = require('../models/role');

const roleController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(role);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createRole: async (req, res) => {
    try {
      const newRole = await Role.create(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRole) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(updatedRole);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const deletedRole = await Role.findByIdAndDelete(req.params.id);
      if (!deletedRole) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json({ message: 'Role deleted successfully' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = roleController;