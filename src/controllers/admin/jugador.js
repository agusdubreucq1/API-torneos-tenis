import Jugador from "../../models/jugador.js";

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
        try{
           const jugador = await Jugador.create(req.body);
        res.json(jugador); 
        }catch(e){
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
    }

}

