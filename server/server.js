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

/** socket adapter로 부터 sids와 rooms를 가져와서 public room을 구한다.  */
const getPublicRoom = () => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRoom = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRoom.push(key);
    }
  });
  return publicRoom;
};

io.on('connection', (socket) => {
  //처음 들어온 사람은 익명의 닉네임 지정
  socket['nickname'] = 'Anon';
  console.log(socket.nickname);
  socket.onAny((event) => {
    console.log('⭐️ Socket Event :', event);
  });
  console.log(`User Connected , socket ID: ${socket.id}`); //user socket id

  //public 룸이 변경되 것을 모두에게 전달
  io.sockets.emit('room-change', getPublicRoom());

  //join : 지정된 룸에 소켓을 구독하도록 호출
  socket.on('join-room', (roomName) => {
    socket.join(roomName); //룸 입장
    console.log(socket.rooms); //모든 room id 정보 조회

    //누군가 방에 들어오면 방 안에 있는 모두에게 메세지 보냄
    socket.to(roomName).emit('welcome', socket.nickname);

    //public 룸이 변경되 것을 모두에게 전달
    io.sockets.emit('room-change', getPublicRoom());
  });

  //클라이언트가 서버와 연결이 끊어지기 전에 마지막 메세지 전송
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname)
    );
  });

  //클라이언트가 서버와 연결이 끊겼을때 메세지 보냄
  socket.on('disconnect', () => {
    //public 룸이 변경되 것을 모두에게 전달
    io.sockets.emit('room-change', getPublicRoom());
  });

  //모든 룸 유저에게 채팅 메세지 보내기
  socket.on('chat-message', (message, roomName, done) => {
    socket.to(roomName).emit('chat-message', message, socket.nickname);
    done();
  });

  //룸 유저의 닉네임 저장
  socket.on('nick-name', (name) => {
    socket['nickname'] = name;
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
