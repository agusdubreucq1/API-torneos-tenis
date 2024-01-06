import sequelize from "./conexion.js";
import { DataTypes } from "sequelize";

const Jugador = sequelize.define('jugador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    apellido: {
        type: DataTypes.TEXT
    }
}, {
    onDelete: 'cascade',
})

export default Jugador;
