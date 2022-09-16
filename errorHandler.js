import NotFound from "./errors/NotFount.js";
import BadRequest from "./errors/BadRequest.js";

export function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "BadRequestError":
      res.status(400).send(err.message);
      break;
    case "NotFoundError":
      res.status(404).send(err.message);
      break;
    default:
      res.status(500).json(err);
      break;
  }
}
