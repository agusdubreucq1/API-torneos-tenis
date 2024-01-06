import Jugador from "../../../models/jugador.js";
import Partido from "../../../models/partido.js";
import Torneo from "../../../models/torneo.js";

export const partido_controller = {
  get_partidos: async (req, res) => {
    const { idTorneo } = req.params;
    console.log(idTorneo);
    try {
      const partidos = await Partido.findAll({
        where: {
          torneoId: idTorneo,
        },
        attributes:{
          exclude: ["torneoId", "pareja1", "pareja2", "updatedAt"]
        },
        
        include: [
          { model: Jugador, as: "Pareja1" }, // Usa el alias que definiste en la asociación
          { model: Jugador, as: "Pareja2" },
          { model: Jugador, as: "Ganador" },
          Torneo,
        ],
        
      });
      res.json(partidos);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(e)
    }
  },
  get_partido_by_id: async (req, res) => {
    const { idTorneo, id } = req.params;
    try {
      const partido = await Partido.findByPk(id);
      res.json(partido);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  create_partido: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      req.body.torneoId = idTorneo;
      const partido = await Partido.create(req.body);
      res.json(partido);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update_partido: async (req, res) => {
    const { id } = req.params;
    try {
      const partido = await Partido.findByPk(id);
      await partido.update(req.body);
      res.json(partido);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
