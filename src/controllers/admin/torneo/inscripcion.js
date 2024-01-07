import Jugador from "../../../models/jugador.js";
import Torneo from "../../../models/torneo.js";

export const inscripcion_controller = {
  get_inscripciones: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      const inscripciones = await Torneo.findOne({
        where: { id: idTorneo },
        attributes: { exclude: ["id", "nombre", "lugar", "descripcion", "fecha", "estado", "categoria"] },
        include: Jugador,
      });
      if (!inscripciones) {
        return res.status(404).json({ error: "Torneo no encontrado" });
      }
      res.json(inscripciones);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error, al obtener las inscripciones", error_message: error });
    }
  },
  create_inscripcion: async (req, res) => {
    const { idTorneo } = req.params;
    const { id_jugador } = req.body;
    try {
      const jugador = await Jugador.findByPk(id_jugador);
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }
      const torneo = await Torneo.findByPk(idTorneo);
      if (!torneo) {
        return res.status(404).json({ error: "Torneo no encontrado" });
      }
      await torneo.addJugador(Number(req.body.id_jugador));
      res.json(torneo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  },
  delete_inscripcion: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      const torneo = await Torneo.findByPk(idTorneo);
      torneo.removeJugador(req.body.id_jugador);
      res.json(inscripcion);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
