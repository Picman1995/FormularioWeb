const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para localhost
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

// para compartir en la red con ip local
// app.use(cors({
//     origin: 'http://192.168.42.110:3000', // Permite solicitudes desde este origen
//     methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
//     credentials: true
// }));

// Conexión a la base de datos PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    user: 'bmaiz',
    host: '192.168.42.235',
    database: 'coop_excedentes',
    password: 'bmaiz123',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos PostgreSQL establecida');
});

global.pool = pool;

// Importar las rutas de nuestro servidor backend
const excedenteRoutes = require('./routes/excedente.routes');
excedenteRoutes(app);

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto http://0.0.0.0:${PORT}`);
});
