const express = require("express");
const cors = require("cors");
const os = require("os");


const propiedadesRouter = require("./routes/propiedades");
const arrendatariosRouter = require("./routes/arrendatarios");
const pagosRouter = require("./routes/pagos");
const contratosRouter = require("./routes/contratos");
const mantenimientosRouter = require("./routes/mantenimientos");
const comunasRouter = require("./routes/comunas");

const app = express();
app.use(cors());
app.use(express.json());

//Configuración simple de autenticación 
//const API_KEY = "clave1234"; 

//Middleware para verificar header Clave-De-Autenticacion
//app.use((req, res, next) => {
//    const claveHeader = req.header("Clave-De-Autenticacion");
//    if (!claveHeader || claveHeader !== API_KEY) {
//        return res.status(401).json({ error: "Clave de autenticación inválida" });
//    }
//    next();
//});

const PORT = process.env.PORT || 3000;

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let alias of interfaces[iface]) {
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return "127.0.0.1";
}

app.get("/", (req, res) => {
    res.send(`
        <h2>API Rent a House Funcionando</h2>
        <p>Rutas disponibles:</p>
        <ul>
            <li><a href="/propiedades">/propiedades</a></li>
            <li><a href="/arrendatarios">/arrendatarios</a></li>
            <li><a href="/pagos">/pagos</a></li>
            <li><a href="/contratos">/contratos</a></li>
            <li><a href="/mantenimientos">/mantenimientos</a></li>
            <li><a href="/comunas">/comunas</a></li>
        </ul>
    `);
});


app.use("/propiedades", propiedadesRouter);
app.use("/arrendatarios", arrendatariosRouter);
app.use("/pagos", pagosRouter);
app.use("/contratos", contratosRouter);
app.use("/mantenimientos", mantenimientosRouter);
app.use("/comunas", comunasRouter);

app.listen(PORT, "0.0.0.0", () => {
    const localIP = getLocalIP();
    console.log("==============================");
    console.log(`Servidor corriendo en:`);
    console.log(` → Local: http://localhost:${PORT}`);
    console.log(` → Red:   http://${localIP}:${PORT}`);
    console.log("==============================");
});
