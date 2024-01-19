import { z } from "zod";
import Jugador from "../models/jugador.js";

export const inscripcionSchema = z.object({
    id_jugador: z.number({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: id_jugador"}).int('El valor debe ser un numero entero')
    .refine(async (n)=>{
        const jugador = await Jugador.findByPk(n)
        return !!jugador
    }, {message: "Jugador no encontrado"})
})