import Jugador from "../../models/jugador.js";
import { User } from "../../models/user.js";

export const jugador_controller = {
  get_jugadores: async (_req, res) => {
    try {
      const jugadores = await Jugador.findAll();
      res.json(jugadores);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  create_jugador: async (req, res) => {
    const { nombre, apellido, dni } = req.body;
    if (!nombre || !apellido || !dni) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    try {
      const user = await User.create({ nombre, apellido, dni, password: dni, isAdmin: false });
      const jugador = await Jugador.create({ userId: user.id });
      res.json(jugador);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  get_jugador_by_id: async (req, res) => {
    try {
      const jugador = await Jugador.findByPk(req.params.id);
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update_jugador: async (req, res) => {
    try {
      const jugador = await Jugador.findByPk(req.params.id);
      await jugador.update(req.body);
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
