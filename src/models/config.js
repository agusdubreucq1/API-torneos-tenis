import  Torneo  from './torneo.js';
import Jugador from './jugador.js';
import Partido from './partido.js';
import { User } from './user.js';
import sequelize from './conexion.js';

Partido.belongsTo(Torneo)
Torneo.belongsToMany(Jugador, { through: 'torneo_jugador' })
Jugador.belongsToMany(Torneo, { through: 'torneo_jugador' })
Jugador.belongsToMany(Partido, { through: 'partido_jugador' });
Partido.belongsTo(Jugador, {
    foreignKey: "pareja1",
    targetKey: "id",
    as: "Pareja1"
})
Partido.belongsTo(Jugador, {
    foreignKey: "pareja2",
    targetKey: "id",
    as: "Pareja2"
})
Partido.belongsTo(Jugador, {
    foreignKey: "ganador",
    targetKey: "id",
    as: "Ganador"
})


const config_db = async ()=>{
    sequelize.sync({alter: true})
}

export default config_db;