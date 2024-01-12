import { createError } from "../../constantes.js";
import Torneo from "../models/torneo.js";


export const main_controller = {
  get_torneos: async (_req, res) => {
    try {
      let torneos = await Torneo.findAll({
        attributes:{
            exclude: ["createdAt", "updatedAt"],
        }
      });
      res.json(torneos);
    } catch (error) {
      console.error(error);
      res.status(500).json(createError("error al obtener los torneos"));
    }
  }
}