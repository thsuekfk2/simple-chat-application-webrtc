import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log('⭐️ Socket Event :', event);
  });
  console.log(`User Connected: ${socket.id}`); //user socket id
  socket.on('join-room', (roomName) => {
    socket.join(roomName); //룸 입장
    console.log(socket.rooms); //모든 room 정보 조회
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
