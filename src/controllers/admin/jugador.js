import { Op } from "sequelize";
import { createError } from "../../../constantes.js";
import Jugador from "../../models/jugador.js";
import Partido from "../../models/partido.js";
import { User } from "../../models/user.js";

export const jugador_controller = {
  get_jugadores: async (_req, res) => {
    try {
      const jugadores = await Jugador.findAll({
        include: {
          model: User,
          attributes: ["nombre", "apellido", "dni"],
        },
      });
      res.json(jugadores);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  create_jugador: async (req, res) => {
    const { nombre, apellido, dni } = req.body;
    console.log(req.body)
    if (!nombre || !apellido || !dni) {
      return res.status(400).json(createError("Todos los campos son obligatorios"));
    }
    
    try {
      const user = await User.findOne({ where: { dni } });
      if (user) return res.status(400).json(createError("El usuario ya existe"));
      
      const newUser = await User.create({ nombre, apellido, dni, password: dni, isAdmin: false });
      const jugador = await Jugador.create({ userId: newUser.id });
      res.json(jugador);
    } catch (e) {
      console.log(e)
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  get_jugador_by_id: async (req, res) => {
    try {
      const jugador = await Jugador.findOne({
        include: {
          model: User,
          attributes: ["nombre", "apellido", "dni"],
        },
        where: { id: req.params.id },
      });
      if (!jugador) return res.status(404).json(createError("Jugador no encontrado"));
      res.json(jugador);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_jugador: async (req, res) => {
    try {
      const jugador = await Jugador.findByPk(req.params.id);
      await jugador.update(req.body);
      res.json(jugador);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  get_partidos_by_jugador: async (req, res) => {
    const { id } = req.params;
    try {
      const partidos = await Partido.findAll({
        where:{
          [Op.or]: [
            { pareja1: id },
            { pareja2: id }
          ]
        },
        attributes: { exclude: ["pareja1", "pareja2", "updatedAt", "torneo_id"] },
        include: [
          {model: Jugador, as: "Pareja1", attributes: ["id"], include: { model: User, attributes: ["nombre", "apellido", "dni"] }},
          {model: Jugador, as: "Pareja2", attributes: ["id"],include: { model: User, attributes: ["nombre", "apellido", "dni"] }} // Usa el alias que definiste en la asociación
        ]
      })
      res.json(partidos)
    }catch(e){
      console.log(e)
      res.status(500).json(createError("Internal Server Error"))
    }
  }
};
