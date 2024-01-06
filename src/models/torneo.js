import sequelize from "./conexion.js";

import {  DataTypes } from "sequelize";

const Torneo = sequelize.define('torneo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    fecha: {
        type: DataTypes.DATE
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