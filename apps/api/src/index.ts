import https from 'https';
import fs from 'fs';
import express from 'express';
import {loginRouter, registerRouter} from './routes/auth/userAuth';
import { sessionRouter } from './routes/sessions';
import { getSessionRouter } from './routes/sessions/user';

const app = express();
app.use(express.json());

app.use("/auth/login", loginRouter)
app.use("/auth/register", registerRouter)
app.use("/sessions", sessionRouter)
app.use("/getsession", getSessionRouter);

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
