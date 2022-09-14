import { Router } from "express";

const userRouter = Router();

const users = [
  {
    id: 1,
    name: "Tommy",
  },
  {
    id: 2,
    name: "Johnny",
  },
];

userRouter.get("/", (req, res) => {
  res.json(users);
});

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send(`User with ID ${id} not found!`);
  }

  return res.json(user);
});

userRouter.post("/", (req, res) => {
  const user = req.body;

  users.push(user);

  res.status(201).json(user);
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;

  const index = users.indexOf((user) => user.id === id);

  if (index === -1) {
    res.status(404).send(`User with ID ${id} not found!`);
    return;
  }

  users[index] = req.body;

  res.json(users[index]);
});

export default userRouter;
