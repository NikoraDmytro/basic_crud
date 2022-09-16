import { isValidObjectId } from "mongoose";

import NotFound from "../errors/NotFount.js";
import BadRequest from "../errors/BadRequest.js";

import userModel from "../models/User.model.js";

const userNotFound = (id) => new NotFound(`User with ID ${id} not found!`);

class UserService {
  async get() {
    const users = await userModel.find();

    return users;
  }

  async getOne(id) {
    this.#checkIdValidity(id);

    const user = await userModel.findById(id);

    if (!user) {
      throw userNotFound(id);
    }

    return user;
  }

  async create(user) {
    await this.#checkDuplicateEntry(user);

    const created = await userModel.create(user);

    return created;
  }

  async update(id, userToUpdate) {
    this.#checkIdValidity(id);
    const error = await userModel.validate(userToUpdate);

    if (error) {
      throw new BadRequest(error);
    }

    await this.#checkDuplicateEntry(userToUpdate, id);

    const updatedUser = await userModel.findByIdAndUpdate(id, userToUpdate, {
      new: true,
    });

    if (!updatedUser) {
      throw userNotFound(id);
    }

    return updatedUser;
  }

  async delete(id) {
    this.#checkIdValidity(id);
    const deleted = await userModel.findByIdAndDelete(id);

    if (!deleted) {
      throw userNotFound(id);
    }
  }

  async patch(id, dataToUpdate) {
    const user = await this.getOne(id);

    Object.assign(user, dataToUpdate);

    await this.#checkDuplicateEntry(user, id);
    await user.save();

    return user;
  }

  async #checkDuplicateEntry(user, id) {
    const existingUser = await userModel.findOne({
      _id: {
        $ne: id,
      },
      firstName: user.firstName,
      lastName: user.lastName,
      residence: user.residence,
    });

    if (existingUser) {
      throw new BadRequest(
        `User ${user.firstName} ${user.lastName}, residing at ${user.residence}, already exists!`
      );
    }
  }

  #checkIdValidity(id) {
    if (!isValidObjectId(id)) {
      throw userNotFound(id);
    }
  }
}

export default new UserService();
