import { createError } from "../../../../constantes.js";
import Jugador from "../../../models/jugador.js";
import Partido from "../../../models/partido.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";
import { partidoSchema } from "../../../schemas/partido.js";

export const partido_controller = {
  get_partidos: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      const partidos = await Partido.findAll({
        where: {
          torneoId: idTorneo,
        },
        attributes: {
          exclude: ["pareja1", "pareja2", "updatedAt", "torneo_id"],
        },
        include: [
          { model: Jugador, as: "Pareja1", include: { model: User, attributes: ["nombre", "apellido", "dni"] } }, // Usa el alias que definiste en la asociación
          { model: Jugador, as: "Pareja2", include: { model: User, attributes: ["nombre", "apellido", "dni"] } },
        ],
      });
      if (!partidos) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      res.json(partidos);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
      console.log(e);
    }
  },
  get_partido_by_id: async (req, res) => {
    const { id } = req.params;
    try {
      const partido = await Partido.findByPk(id);
      if (!partido) {
        return res.status(404).json(createError("Partido no encontrado"));
      }
      res.json(partido);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  create_partido: async (req, res) => {
    const { idTorneo } = req.params;
    const { orden, jugadoresXRonda } = req.body;

    try {
      await partidoSchema.parseAsync(req.body);
    } catch (e) {
      console.log(e);
      return res.status(400).json(createError(e.issues[0].message));
    }

    try {
      const torneo = await Torneo.findByPk(idTorneo);
      if (!torneo) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      const partidos_del_torneo = await Partido.findAll({
        where: {
          torneoId: idTorneo,
        },
        attributes: ["orden", "jugadoresXRonda"],
      });
      if(partidos_del_torneo.find(p => p.orden === orden && p.jugadoresXRonda === jugadoresXRonda)){
        return res.status(400).json(createError("Ya existe un partido en esta posicion"));
      }
      const partido = await Partido.create({ ...req.body, torneoId: idTorneo });
      res.json(partido);
    } catch (e) {
      console.log(e);
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_partido: async (req, res) => {
    const { id } = req.params;
    try{
      await partidoSchema.parseAsync(req.body);
    } catch (e) {
      console.log(e);
      return res.status(400).json(createError(e.issues[0].message));
    }

    try {
      const partido = await Partido.findByPk(id);
      await partido.update(req.body);
      res.json(partido);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  delete_partido: async (req, res) => {
    const { id } = req.params;
    try {
      const partido = await Partido.findByPk(id);
      if (!partido) {
        return res.status(404).json(createError("Partido no encontrado"));
      }
      await partido.destroy();
      res.json(partido);
    } catch (e) {
      console.log(e);
      res.status(500).json(createError("Internal Server Error"));
    }
  },
};
