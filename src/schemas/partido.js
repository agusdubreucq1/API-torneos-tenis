import { z } from "zod";
import Jugador from "../models/jugador.js";

export function esPotenciaDe2(n) {
    if (n === 0) {
      return false;
    }
    if (n === 1) {
      return true;
    }
    while (n > 1) {
      let resto = n % 2;
      if (resto !== 0) {
        return false;
      }
      n = n / 2;
    }
    return true;
  }
  
//   { resultado, fecha, pareja1, pareja2, ganador, orden, jugadoresXRonda}

export const partidoSchema = z.object({
    jugadoresXRonda: z.number('El valor debe ser un numero entero').int().refine((n)=>{
        return esPotenciaDe2(n)
    }, {message: "El valor debe ser una potencia de 2"}),
    pareja1: z.number({required_error: "Faltan campos obligatorios: jugador 1", invalid_type_error: "Error en el campo: jugador 1"}).refine(async (n)=>{
        const jugador = await Jugador.findByPk(n)
        return !!jugador
    }, {message: "Jugador 1 no encontrado"}),
    pareja2: z.number({required_error: "Faltan campos obligatorios: jugador 2", invalid_type_error: "Error en el campo: jugador 2"}).refine(async (n)=>{
        const jugador = await Jugador.findByPk(n)
        return !!jugador
    }, {message: "Jugador 2 no encontrado"}),
    orden: z.number({required_error: "Faltan campos obligatorios", invalid_type_error: "Faltan campos obligatorios"}).int('El valor debe ser un numero entero'),
    fecha: z.optional(z.coerce.date()),
    ganador: z.optional(z.number({invalid_type_error: "Error en el campo: ganador"}).min(1, 'No es un ganador valido').max(2, 'No es un ganador valido')),
    resultado: z.optional(z.string('El resultado debe ser un texto')),
}, {required_error: "Faltan campos obligatorios"}).refine((data)=>{
    if((data.ganador && !data.resultado) || (!data.ganador && data.resultado)){
        return false
    }
    return true
}, {message: "Si hay ganador debe haber un resultado y viceversa"}).refine((data)=>{
    return data.pareja1 !== data.pareja2
}, {message: "Los jugadores no pueden ser iguales"})