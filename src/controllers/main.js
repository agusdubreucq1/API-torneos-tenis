import { createError } from "../../constantes.js";
import Torneo from "../models/torneo.js";
import { User } from "../models/user.js";


export const main_controller = {
  get_torneos: async (_req, res) => {
    try {
      let torneos = await Torneo.findAll({
        include: {
          model: User,
          attributes: ["nombre", "apellido", "dni"],
        },
        attributes:{
            exclude: ["createdAt", "updatedAt"],
        }
      });
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
}