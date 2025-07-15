import https from 'https';
import fs from 'fs';
import express from 'express';
import {loginRouter} from './routes/auth/login';

const app = express();
app.use(express.json());

app.use("/login", loginRouter)

// HTTPS server wraps the express app
const httpsServer = https.createServer(
    {
        cert: fs.readFileSync('./certs/cert.pem'),
        key: fs.readFileSync('./certs/key.pem'),
    },
    app
);

httpsServer.listen(3003, () => {
    console.log('HTTPS Express server running at https://localhost:3003');
});
