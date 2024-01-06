import { Sequelize } from "sequelize";
import { config } from 'dotenv';
config();

console.log(process.env.DB_HOST)

const user = process.env.DB_USER ?? "root";
const pass = process.env.DB_PASSWORD ?? "";
const host = process.env.DB_HOST ?? "localhost";
const name = process.env.DB_NAME ?? "padel";

const sequelize = new Sequelize(
    name,
    user,
    pass,
    {
        dialect: 'mysql',
        host: host,
        logging: false
    }
)

export default sequelize;
// module.exports = sequelize;