import { User } from "../models/user.js";
import { compare } from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from "dotenv";
import Jugador from "../models/jugador.js";
import { createError } from "../../constantes.js";
import { loginSchema, registerSchema } from "../schemas/user.js";
import sequelize from "../models/conexion.js";
config();

export const login_controller = {
  register: async (req, res) => {
    const { nombre, apellido, password, dni, isAdmin } = req.body;

    try{
      await registerSchema.parseAsync(req.body)
    } catch (e){
      return res.status(400).json(createError(e.issues[0].message))
    }
 
    const t = await sequelize.transaction();
    try {
      const newUser = await User.create({ nombre, apellido, password, dni, isAdmin }, {transaction: t});
      if(!isAdmin){
        Jugador.create({ userId: newUser.id }, {transaction: t});
      }
      await t.commit();
      res.status(200).json({ nombre: newUser.nombre, dni: newUser.dni, isAdmin: newUser.isAdmin, apellido: newUser.apellido });
    } catch (e) {
      await t.rollback();
      res.status(500).json(createError("Internal Server Error"));
      console.log(e)
    }
  },
  login: async (req, res) => {
    const { dni } = req.body;

    try{
      await loginSchema.parseAsync(req.body)
    } catch (e){
      return res.status(400).json(createError(e.issues[0].message))
    }
   
    try {
      const user = await User.findOne({ where: { dni }, include: { model: Jugador } });
      const token = sign({ user }, process.env.JWT_SECRET);
      res.send({ message: "Inicio de sesión exitoso", user: { token, nombre: user.nombre, apellido: user.apellido, dni: user.dni, isAdmin: user.isAdmin, jugador: user.jugador } });
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
      console.log(e)
    }
  },
};
