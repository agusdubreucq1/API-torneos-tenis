import  Torneo  from './torneo.js';
import Jugador from './jugador.js';
import Partido from './partido.js';
import { User } from './user.js';
// import Pareja  from './pareja.js';
import sequelize from './conexion.js';

// Torneo.hasMany(Pareja)
Partido.belongsTo(Torneo)
Torneo.belongsToMany(Jugador, { through: 'torneo_jugador' })
Jugador.belongsToMany(Torneo, { through: 'torneo_jugador' })
// Partido.belongsToMany(Jugador, { through: 'partido_jugador' });
Jugador.belongsToMany(Partido, { through: 'partido_jugador' });
// Pareja.belongsTo(Jugador, {
//     foreignKey: "jugador1", // el nombre de la columna que almacena el foreign key
//     targetKey: "id" // el nombre de la columna a la que hace referencia el foreign key
// });
// Pareja.belongsTo(Jugador, {
//     foreignKey: "jugador2",
//     targetKey: "id"
// });
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
// Jugador.belongsToMany(Torneo, { through: 'torneo_jugador' });


const config_db = async ()=>{
    sequelize.sync({alter: true})
}

export default config_db;