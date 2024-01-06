import Jugador from "../../../models/jugador.js";
import Torneo from "../../../models/torneo.js";

export const inscripcion_controller = {

    get_inscripciones: async (req, res) => {
        const { idTorneo } = req.params;
        console.log(idTorneo)
        try {
            const inscripciones = await Torneo.findAll({
                where: { id: idTorneo },
                include: Jugador
            });
            res.json(inscripciones);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error, al obtener las inscripciones", error_message: error });
        }
    },
    create_inscripcion: async (req, res) => {
        const { idTorneo } = req.params;
        console.log(idTorneo)
        try {
            const torneo = await Torneo.findByPk(idTorneo);
            await torneo.addJugador(Number(req.body.id_jugador));
            res.json(torneo);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            console.log(error)
        }
    },
    delete_inscripcion: async (req, res) => {
        const {idTorneo} = req.params;
        try {
            const torneo = await Torneo.findByPk(idTorneo);
            torneo.removeJugador(req.body.id_jugador);
            res.json(inscripcion);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}