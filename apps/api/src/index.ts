import https from 'https';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import {loginRouter, registerRouter} from './routes/auth/userAuth';
import { sessionRouter } from './routes/sessions/manageSession';
import { getSessionRouter } from './routes/sessions/sessionFetch';

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',  // Your frontend URL
    'http://localhost:3000',  // Add other frontend URLs if needed
  ],
  credentials: true,  // Allow cookies/credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
