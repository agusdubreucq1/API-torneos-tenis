import { createError } from "../../../../constantes.js";
import Jugador from "../../../models/jugador.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";

export const inscripcion_controller = {
  get_inscripciones: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      const inscripciones = await Torneo.findOne({
        where: { id: idTorneo },
        attributes: { exclude: ["id", "nombre", "lugar", "descripcion", "fecha", "estado", "categoria"] },
        include: {model: Jugador, as: "jugadores", attributes: {exclude: ["torneo_jugador"]}, through: {attributes: []}, include: { model: User, attributes: ["nombre", "apellido", "dni"] }},
      });

      if (!inscripciones) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      res.json(inscripciones);
    } catch (error) {
      console.log(error);
      res.status(500).json(createError("Error al obtener las inscripciones"));
    }
  },
  create_inscripcion: async (req, res) => {
    const { idTorneo } = req.params;
    const { id_jugador } = req.body;
    try {
      const jugador = await Jugador.findByPk(id_jugador);
      if (!jugador) {
        return res.status(404).json(createError("Jugador no encontrado"));
      }
      const torneo = await Torneo.findByPk(idTorneo);
      if (!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      console.log(torneo, jugador, idTorneo, id_jugador)
      await torneo.addJugadores(Number(req.body.id_jugador));
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
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
      res.status(500).json(createError("Internal Server Error"));
    }
  },
};
