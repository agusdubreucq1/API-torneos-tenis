import sequelize from "./conexion.js";
import { DataTypes } from "sequelize";

const Pareja = sequelize.define('pareja', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jugador1:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jugador2:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})



export default Pareja;
