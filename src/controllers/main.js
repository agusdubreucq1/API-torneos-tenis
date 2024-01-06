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
      res.status(500).json({ error: "Error al obtener los torneos" });
    }
  }
}