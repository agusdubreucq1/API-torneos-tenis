import  Torneo  from './torneo.js';
import Jugador from './jugador.js';
import Partido from './partido.js';
import { User } from './user.js';
import sequelize from './conexion.js';

Partido.belongsTo(Torneo)

User.hasOne(Jugador, { foreignKey: "userId", optional: true });
Jugador.belongsTo(User, { foreignKey: "userId" });

Torneo.belongsToMany(User, { through: 'torneo_admin' })
User.belongsToMany(Torneo, { through: 'torneo_admin' })

Torneo.belongsToMany(Jugador, { through: 'torneo_jugador', as: 'jugadores' })
Jugador.belongsToMany(Torneo, { through: 'torneo_jugador', as: 'torneos' })

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



const config_db = async ()=>{
    sequelize.sync({alter: true})
}

export default config_db;