import { ESTADO, createError } from "../../../../constantes.js";
import Torneo from "../../../models/torneo.js";

export const torneo_controller = {
  get_torneos: async (_req, res) => {
    try {
      const torneos = await Torneo.findAll();
      res.json(torneos);
    } catch (error) {
      console.error(error);
      res.status(500).json(createError("Error al obtener los torneos"));
    }
  },

  get_torneo_by_id: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Error al obtener el torneo"));
    }
  },
  create_torneo: async (req, res) => {
    const { nombre, fecha, categoria, cant_jugadores} = req.body;
    if (!nombre || !fecha  || !categoria || !cant_jugadores) {
      return res.status(400).json(createError("Todos los campos son obligatorios"));
    }
    const body = {...req.body, estado: ESTADO.ABIERTO};
    try {
      const torneo = await Torneo.create(body);
      const user_id = req.user.user.id;
      console.log(req.user.user.id)
      await torneo.addUser(user_id);
      res.json(torneo);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_torneo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      await torneo.update(req.body);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  delete_torneo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      if(!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      await torneo.destroy();
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  }
};
