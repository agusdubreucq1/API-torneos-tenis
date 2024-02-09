import { Op, Sequelize } from "sequelize";
import { createError } from "../../../../constantes.js";
import Jugador from "../../../models/jugador.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";
import sequelize from "../../../models/conexion.js";
import { inscripcionSchema } from "../../../schemas/inscripcion.js";
import Partido from "../../../models/partido.js";

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
  getJugadoresNoInscritos: async (req, res) => {
    const {idTorneo} = req.params;
    try{
      const torneo = await Torneo.findByPk(idTorneo);
      if(!torneo){
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      const jugadoresInscritos = await sequelize.query(`(SELECT jugadorId FROM torneo_jugador WHERE torneoId = :idTorneo)`, { replacements: { idTorneo: idTorneo} })
      // console.log('jugadoresInscritos: ',jugadoresInscritos)

      const ids = jugadoresInscritos[0].map(j => j.jugadorId);
      const jugadoresNoInscritos = await Jugador.findAll({
        where: {
          id: {
            [Op.notIn]: ids
          }
        },
        include: { model: User, attributes: ["nombre", "apellido", "dni"] }
      });
      res.json(jugadoresNoInscritos);
    } catch (error) {
      console.log(error);
      res.status(500).json(createError("Error al obtener los jugadores no inscritos"));
    }
  },
  create_inscripcion_by_jugador: async (req, res) => {
    const { idTorneo } = req.params;
    const id_jugador = req.user.user?.jugador?.id
    try {
      const torneo = await Torneo.findOne({
        where: { id: idTorneo },
        attributes:  ["id"],
        include: {model: Jugador, as: "jugadores", attributes: ["id"]},
      });

      if (!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }

      if (torneo.jugadores.map((jugador) => jugador.id).includes(id_jugador)) {
        return res.status(400).json(createError("Jugador ya inscrito"));
      }

      await torneo.addJugadores(id_jugador);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
      console.log(error);
    }
  },
  create_inscripcion: async (req, res) => {
    const { idTorneo } = req.params;
    const { id_jugador } = req.body;
    try{
      await inscripcionSchema.parseAsync(req.body);
    } catch (e) {
      console.log(e)
      return res.status(400).json(createError(e.issues[0].message));
    }
    try {
      const torneo = await Torneo.findOne({
        where: { id: idTorneo },
        attributes:  ["id"],
        include: {model: Jugador, as: "jugadores", attributes: ["id"]},
      });

      if (!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }

      if (torneo.jugadores.map((jugador) => jugador.id).includes(id_jugador)) {
        return res.status(400).json(createError("Jugador ya inscrito"));
      }

      await torneo.addJugadores(id_jugador);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
      console.log(error);
    }
  },
  delete_inscripcion: async (req, res) => {
    const { idTorneo} = req.params;

    try {
      const torneo = await Torneo.findByPk(idTorneo,{
        include: {model: Jugador, as: "jugadores", attributes: ["id"]},
      });
      if(req.user.user.isAdmin){
        res.status(403).json(createError("No eres un jugador"));
        return
      }
      
      const jugador = await Jugador.findByPk(req.user.user.jugador?.id);
      
      if(jugador === null || torneo === null) {
        return res.status(404).json(createError("Jugador o torneo no encontrado"));
      }
      const partidos = await Partido.findAll({
        where: {
          torneoId: idTorneo,
          [Op.or]: [
            {
              pareja1: jugador.id,
            },
            {
              pareja2: jugador.id
            }
          ]
        }
      })
      if(partidos.length > 0){
        return res.status(400).json(createError("No se puede eliminar al jugador porque tiene partidos creados"));
      }
      
      torneo.removeJugadores(jugador);
      res.json(torneo);
    } catch (error) {
      console.log(error)
      res.status(500).json(createError("Internal Server Error"));
    }
  },
};
