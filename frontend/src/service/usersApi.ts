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

export const getUserById = async (id: string) => {
  const res = await instance.get<IUser>(`/${id}`);

  const user = res.data;

  //Converting date string to actual date
  user.dateOfBirthday = new Date(user.dateOfBirthday);

  return user;
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

export const editUser = async (user: IUser) => {
  const res = await instance.put<IUser>(`/${user._id}`, user);

  const editedUser = res.data;

  //Converting date string to actual date
  editedUser.dateOfBirthday = new Date(editedUser.dateOfBirthday);

  return editedUser;
};
