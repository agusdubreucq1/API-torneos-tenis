import pkg from "jsonwebtoken";
// const { jwt } = pkg;
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Torneo from "../models/torneo.js";
import { User } from "../models/user.js";
import { createError } from "../../constantes.js";
config();

export const isLoggedIn = (req, res, next) => {
  let token = req.headers.authorization;
  token = token?.replace("Bearer ", "");

  if (token == null) return res.status(403).json({ message: "No tenes los permisos" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "No tenes los permisos", error: "no tienes los permisos" });

    req.user = { ...user, password: "" };
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.user.isAdmin) next();
  else {
    return res.status(403).json({ message: "No sos admin" });
  }
};

export const isAdminOfTorneo = async (req, res, next) => {
  const { idTorneo } = req.params;
  let torneo;
  try {
    torneo = await Torneo.findOne({
      where: { id: idTorneo },
      include: { model: User, attributes: ["id", "isAdmin"] },
    });
    if (!torneo) {
      return res.status(404).json(createError("Torneo no encontrado"));
    }
    if (!torneo.users.map((user) => user.id).includes(req.user.user.id)) {
      return res.status(403).json(createError("No eres admin del torneo"));
    }
  } catch (err) {
    return res.status(500).json(createError("Internal Server Error"));
  }
  req.torneo = torneo;

  next();
};
