import  sequelize  from './conexion.js'
import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt"

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni:{
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.TEXT
    },
    apellido:{
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

User.beforeSave(async (user,option)=>{
    const { password} = user;
    const hash = await bcrypt.hash(password, 10);

    user.password = hash
})

