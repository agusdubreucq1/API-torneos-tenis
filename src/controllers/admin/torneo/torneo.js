import { ESTADO } from "../../../../constantes.js";
import Torneo from "../../../models/torneo.js";

export const torneo_controller = {
  get_torneos: async (_req, res) => {
    try {
      const torneos = await Torneo.findAll();
      res.json(torneos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los torneos" });
    }
  },

  get_torneo_by_id: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      res.json(torneo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  create_torneo: async (req, res) => {
    const body = {...req.body, estado: ESTADO.ABIERTO};
    console.log(body)
    try {
      const torneo = await Torneo.create(body);
      res.json(torneo);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update_torneo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      await torneo.update(req.body);
      res.json(torneo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  delete_torneo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id);
      if(!torneo) {
        return res.status(404).json({ error: "Torneo no encontrado" });
      }
      await torneo.destroy();
      res.json(torneo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
