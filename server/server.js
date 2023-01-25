import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
