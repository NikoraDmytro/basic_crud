import userModel from "../models/User.model.js";
import userService from "../services/UserService.js";

class UserController {
  async get(_, res) {
    try {
      const users = await userService.get();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getOne(id);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const userToCreate = req.body;
      const created = await userService.create(userToCreate);

      res.status(201).json(created);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userToUpdate = req.body;

      const updatedUser = await userService.update(id, userToUpdate);

      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await userService.delete(id);

      res.send(`User with ID ${id} deleted!`);
    } catch (e) {
      next(e);
    }
  }

  async patch(req, res, next) {
    try {
      const { id } = req.params;
      const dataToUpdate = req.body;

      const updated = await userService.patch(id, dataToUpdate);

      res.json(updated);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
