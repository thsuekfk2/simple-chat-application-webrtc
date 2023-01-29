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
  console.log(`User Connected , socket ID: ${socket.id}`); //user socket id
  socket.on('join-room', (roomName) => {
    socket.join(roomName); //룸 입장
    console.log(socket.rooms); //모든 room id 정보 조회

    //누군가 방에 들어오면 방 안에 있는 모두에게 메세지 보냄
    socket.to(roomName).emit('welcome', () => {
      console.log('welcome');
    });
  });
  //클라이언트가 서버와 연결이 끊어지기 전에 마지막 메세지 전송
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => socket.to(room).emit('bye'));
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
