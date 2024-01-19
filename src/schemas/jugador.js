import { z } from "zod";
import { User } from "../models/user.js";

export const jugadorSchema = z.object({
    nombre: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: nombre"}),
    apellido: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: apellidos"}),
    dni: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: dni"}).refine(async (dni)=>{
        const user = await User.findOne({ where: { dni } })
        return !user
    }, {
        message: "Ya existe un jugador con ese dni"
    }), //debe ser un string xq despues eso va a ser el password y se debe hashear
})