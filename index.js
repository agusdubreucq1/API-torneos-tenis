import { config } from 'dotenv';
config();
import express from 'express';
import config_db from './src/models/config.js';
import router_torneo from './src/routes/admin/torneo/torneo.js';
import router_jugador from './src/routes/admin/jugador.js';
import { router_login } from './src/routes/login.js';
import { isLoggedIn } from './src/services/middlewares.js';
import { router_main } from './src/routes/mainRoutes.js';
import { cors, corsOptions } from './src/services/cors.js';

// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.options('*', corsOptions);


const PORT = process.env.PORT || 3000;

app.use("/", router_main);
app.use("/admin/torneo", router_torneo);
app.use("/admin/jugador", router_jugador);
app.use('/', router_login);

app.listen(PORT, async () => {
    try{
        // await sequelize.sync({ alter: true });
        await config_db();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server running on port http://localhost:${PORT}`);
})


