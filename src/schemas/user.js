import { z } from "zod";
import { User } from "../models/user.js";
import { compare } from "bcrypt";

export const loginSchema = z.object({
    dni: z.number({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: dni"}).int(),
    password: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: password"}),
}).refine(async (data)=>{
    const user = await User.findOne({ where: { dni: data.dni } })
    if(!user) return false
    return (await compare(data.password, user?.password))
}, {
    message: "Credenciales incorrectas"
})


export const registerSchema = z.object({
    nombre: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: nombre"}),
    apellido: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: apellidos"}),
    password: z.string({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: password"}),
    dni: z.number({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: dni"}).max(99999999, 'DNI no válido').min(9999999, 'DNI no válido'),
    isAdmin: z.boolean({required_error: "Faltan campos obligatorios", invalid_type_error: "Error en el campo: isAdmin"}),
}).refine(async (data)=>{
    const user = await User.findOne({ where: { dni: data.dni } })
    return !user
}, {
    message: "Ya existe un usuario con ese dni"
})
