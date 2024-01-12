import sequelize from "./conexion.js";
import  Jugador from "./jugador.js";
import { DataTypes } from "sequelize";

const Partido = sequelize.define("partido", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orden:{
        type: DataTypes.INTEGER
    },
    resultado: {
        type: DataTypes.TEXT
    },
    jugadoresXRonda:{
        type: DataTypes.INTEGER
    },
    ronda:{
        type: DataTypes.TEXT
    },
    fecha: {
        type: DataTypes.DATE
    },
    torneo_id: {
        type: DataTypes.INTEGER
    },
    pareja1:{
        type: DataTypes.INTEGER
    },
    pareja2:{
        type: DataTypes.INTEGER
    },
    ganador:{
        type: DataTypes.INTEGER
    }
}, {
    onDelete: 'cascade',
})

// Partido.belongsToMany(Jugador, { through: 'partido_jugador' });
// Jugador.belongsToMany(Partido, { through: 'partido_jugador' });

export default Partido;