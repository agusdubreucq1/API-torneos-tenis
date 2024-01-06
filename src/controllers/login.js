import { User } from "../models/user.js";
import { compare } from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from "dotenv";
config();

export const login_controller = {
  register: async (req, res) => {
    const { username, password, dni } = req.body;
    if (req.user) return res.status(200).json(req.user);
    try {
      const user = await User.findOne({ where: { dni } });
      if (user) return res.status(400).send("El usuario ya existe");

      const newUser = await User.create({ username, password, dni });
      res.status(200).json({ username: newUser.username, dni: newUser.dni });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(e)
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    if (req.user) return res.status(200).json(req.user);
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).send("El usuario no existe");

      const passwordIsValid = await compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }

      const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.send({ message: "Inicio de sesión exitoso", user: { token, username: user.username } });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(e)
    }
  },
};
