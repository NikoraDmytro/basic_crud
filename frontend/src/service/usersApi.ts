import axios from "axios";

import { IUser } from "shared/models/IUser";

const instance = axios.create({
  baseURL: "http://localhost:8080/users",
  timeout: 10000,
});

export const getAllUsers = async () => {
  const res = await instance.get<IUser[]>("/");

  const users = res.data;

  for (let i in users) {
    //Converting date string to actual date
    users[i].dateOfBirthday = new Date(users[i].dateOfBirthday);
  }

  return users;
};

export const createUser = async (user: IUser) => {
  const res = await instance.post<IUser>("/", user);

  const createdUser = res.data;

  //Converting date string to actual date
  createdUser.dateOfBirthday = new Date(createdUser.dateOfBirthday);

  return createdUser;
};

export const deleteUser = async (id: String) => {
  await instance.delete(`/${id}`);
};
