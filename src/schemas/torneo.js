import { z } from "zod";

export const torneoSchema = z.object({
    nombre: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: nombre"}),
    fecha: z.coerce.date({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: fecha"}),
    categoria: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: categoria"})
})