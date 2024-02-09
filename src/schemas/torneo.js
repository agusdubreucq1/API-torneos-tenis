import { z } from "zod";
import { esPotenciaDe2 } from "./partido.js";
import { ESTADO } from "../../constantes.js";

export const torneoSchema = z.object({
    estado: z.optional(z.union([z.literal(ESTADO.ABIERTO), z.literal(ESTADO.COMPLETADO), z.literal(ESTADO.SUSPENDIDO)], {invalid_type_error: "Error en el campo: estado", message: "Estado no válido"}), {invalid_type_error: "Error en el campo: estado", message: "Estado no válido"}),
    nombre: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: nombre"}),
    fecha: z.coerce.date({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: fecha"}),
    categoria: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: categoria"}),
    lugar: z.optional(z.string({invalid_type_error: "Error en el campo: lugar"})).nullable(),
    descripcion: z.optional(z.string({invalid_type_error: "Error en el campo: descripción"})).nullable(),
    cant_jugadores: z.optional(z.number().int().refine((n)=>{
        return esPotenciaDe2(n)
    }, {message: "La cantidad de jugadores debe ser una potencia de 2"})).nullable(),
})