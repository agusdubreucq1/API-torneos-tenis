import { Op } from "sequelize";
import { ESTADO, createError } from "../../../../constantes.js";
import sequelize from "../../../models/conexion.js";
import Torneo from "../../../models/torneo.js";
import { User } from "../../../models/user.js";
import { torneoSchema } from "../../../schemas/torneo.js";

export const torneo_controller = {
  get_torneos: async (_req, res) => {
    try {
      const torneos = await Torneo.findAll();
      res.json(torneos);
    } catch (error) {
      console.error(error);
      res.status(500).json(createError("Error al obtener los torneos"));
    }
  },
  get_torneos_by_admin: async (req, res) => {
    try {
      const torneos = await Torneo.findAll({
        include: [
          { model: User, through: { attributes: [] }, attributes: ["id", "nombre", "apellido", "dni"] },
        ],
        where: {
          "$users.id$": [req.user.user.id],
        }
      })
      res.json(torneos);
    }
    catch (error) {
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
  create_torneo: async (req, res) => {
    try{
      torneoSchema.parse(req.body);
    } catch (e) {
      console.log(e)
      return res.status(400).json(createError(e.issues[0].message));
    }
    const body = { ...req.body, estado: ESTADO.ABIERTO };
    console.log('body: ',body);
    const t = await sequelize.transaction();
    try {
      const torneo = await Torneo.create(body, {transaction: t});
      const user_id = req.user.user.id;
      console.log(req.user.user.id);
      await torneo.addUser(user_id, {transaction: t});
      await t.commit();
      res.json(torneo);
    } catch (e) {
      await t.rollback();
      console.log(e)
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  update_torneo: async (req, res) => {
    try{
      torneoSchema.parse(req.body);
    } catch (e) {
      console.log(e)
      return res.status(400).json(createError(e.issues[0].message));
    }
    
    try{
      let torneo = await req.torneo.update(req.body);
      res.json(torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
  delete_torneo: async (req, res) => {
    try {
      await req.torneo.destroy();
      res.json(req.torneo);
    } catch (error) {
      res.status(500).json(createError("Internal Server Error"));
    }
  },
};
