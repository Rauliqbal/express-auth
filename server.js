import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { PORT, URI } from './config/index.js';
import App from './routes/index.js';

const server = express();

server.use(cors());
server.disable('x-powered-by');
server.use(cookieParser());
server.use(express.json());

// Connect to database
mongoose.connect(URI).then(console.log('Connected to database!')).catch((err) => console.log(err));

server.use(App);

server.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`));
