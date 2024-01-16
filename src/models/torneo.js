import sequelize from "./conexion.js";

import {  DataTypes } from "sequelize";

const Torneo = sequelize.define('torneo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cant_jugadores: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.TEXT
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    fecha: {
        type: DataTypes.DATEONLY
    },
    lugar: {
        type: DataTypes.TEXT
    },
    categoria:{
        type: DataTypes.TEXT
    }
}, {
    onDelete: 'cascade',
})

export default Torneo;

// module.exports = Torneo;