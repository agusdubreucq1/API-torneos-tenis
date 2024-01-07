import sequelize from "./conexion.js";
import { DataTypes } from "sequelize";

const Jugador = sequelize.define('jugador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    onDelete: 'cascade',
})

export default Jugador;
