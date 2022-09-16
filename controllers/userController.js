import userModel from "../models/User.model.js";

class UserController {
  async get(req, res) {
    try {
      const users = await userModel.find();

      res.json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).send(`User with ID ${id} not found!`);
        return;
      }

      res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const user = req.body;
      const created = await userModel.create(user);

      res.status(201).json(created);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const user = new userModel(req.body);

      const error = await user.validate();

      if (error) {
        res.status(400).json(error);
        return;
      }

      const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedUser) {
        res.status(404).send(`User with ID ${id} not found!`);
        return;
      }

      res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await userModel.findByIdAndDelete(id);

      if (!deleted) {
        res.status(404).send(`User with ID ${id} not found!`);
        return;
      }

      res.send(`User with ID ${id} deleted`);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async patch(req, res) {
    try {
      const { id } = req.params;

      const updated = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updated) {
        res.status(404).send(`User with ID ${id} not found!`);
      }

      res.json(updated);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
