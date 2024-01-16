import { ESTADO, createError } from "../../../../constantes.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";

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
      if (!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Error al obtener el torneo"));
    }
  },
  create_torneo: async (req, res) => {
    const { nombre, fecha, categoria, cant_jugadores } = req.body;
    if (!nombre || !fecha || !categoria) {
      return res.status(400).json(createError("Todos los campos son obligatorios"));
    }
    const body = { ...req.body, estado: ESTADO.ABIERTO };
    console.log(body);
    try {
      const torneo = await Torneo.create(body);
      const user_id = req.user.user.id;
      console.log(req.user.user.id);
      await torneo.addUser(user_id);
      res.json(torneo);
    } catch (e) {
      console.log(e)
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_torneo: async (req, res) => {
    try{
      let torneo = await req.torneo.update(req.body);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  delete_torneo: async (req, res) => {
    try {
      await req.torneo.destroy();
      res.json(req.torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
};
