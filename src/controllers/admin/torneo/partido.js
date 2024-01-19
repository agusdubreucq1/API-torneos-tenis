import { createError } from "../../../../constantes.js";
import Jugador from "../../../models/jugador.js";
import Partido from "../../../models/partido.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";

export const partido_controller = {
  get_partidos: async (req, res) => {
    const { idTorneo } = req.params;
    try {
      const partidos = await Partido.findAll({
        where: {
          torneoId: idTorneo,
        },
        attributes:{
          exclude: ["torneoId", "pareja1", "pareja2", "updatedAt", "torneo_id"]
        },
        
        include: [
          { model: Jugador, as: "Pareja1", include: { model: User, attributes: ["nombre", "apellido", "dni"] } }, // Usa el alias que definiste en la asociación
          { model: Jugador, as: "Pareja2", include: { model: User, attributes: ["nombre", "apellido", "dni"] } },
          // { model: Jugador, as: "Ganador", include: { model: User, attributes: ["nombre", "apellido", "dni"] } },
        ],
        
      });
      if (!partidos || partidos.length === 0) {
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      res.json(partidos);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
      console.log(e)
    }
  },
  get_partido_by_id: async (req, res) => {
    const { idTorneo, id } = req.params;
    try {
      const partido = await Partido.findByPk(id);
      res.json(partido);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  create_partido: async (req, res) => {
    const { idTorneo } = req.params;
    const { resultado, ronda, fecha, pareja1, pareja2, ganador, orden, jugadoresXRonda} = req.body
    if(!pareja1 || !pareja2 || !jugadoresXRonda || !orden){
      console.log(req.body)
      return res.status(400).json(createError("Faltan campos obligatorios obligatorios"));
    }
    
    try {
      const jugador1 = await Jugador.findByPk(pareja1);
      const jugador2 = await Jugador.findByPk(pareja2);
      if(!jugador1 || !jugador2){
        return res.status(404).json(createError("Jugador no encontrado"));
      }
      const torneo = await Torneo.findByPk(idTorneo);
      if(!torneo){
        return res.status(404).json(createError("Torneo no encontrado"));
      }
      const partido = await Partido.create({ resultado, ronda, fecha, torneoId: idTorneo, pareja1, pareja2, ganador, orden, jugadoresXRonda});
      res.json(partido);
    } catch (e) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_partido: async (req, res) => {
    const { id } = req.params;
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
    try{
      const partido = await Partido.findByPk(id);
      if(!partido){
        return res.status(404).json(createError("Partido no encontrado"));
      }
      await partido.destroy();
      res.json(partido);
    }catch(e){
      console.log(e)
      res.status(500).json(createError("Internal Server Error"));
    }
  }
};
