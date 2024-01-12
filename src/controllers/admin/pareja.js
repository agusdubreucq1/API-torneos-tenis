import { createError } from "../../../constantes";
import Pareja from "../../models/pareja";

export const pareja_controller = {
    get_parejas: async (req, res) => {
        try {
            const parejas = await Pareja.findAll();
            res.json(parejas);
        } catch (error) {
            res.status(500).json(createError("Internal Server Error"));
        }
    },
    get_pareja_by_id: async (req, res) => {
        try {
            const pareja = await Pareja.findByPk(req.params.id);
            res.json(pareja);
        } catch (error) {
            res.status(500).json(createError("Internal Server Error"));
        }
    },
    update_pareja: async (req, res) => {
        try {
            const pareja = await Pareja.findByPk(req.params.id);
            await pareja.update(req.body);
            res.json(pareja);
        } catch (error) {
            res.status(500).json(createError("Internal Server Error"));
        }
    },
    create_pareja: async (req, res) => {
        try {
            const pareja = await Pareja.create(req.body);
            res.json(pareja);
        } catch (error) {
            res.status(500).json(createError("Internal Server Error"));
        }
    }
}