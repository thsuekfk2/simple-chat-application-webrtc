import { SOCKET_EVENT } from './event.enum';
import { io, Socket } from 'socket.io-client';

let roomSocket = null as Socket | null;

const generateSocket = () => {
  if (!roomSocket) {
    roomSocket = io(`http://localhost:3000`, {
      transports: ['websocket', 'polling'],
    });
  } else return;

  console.log('소켓 연결 완료😀 : ', roomSocket);
};

const joinRoom = (roomName?: string) => {
  roomSocket?.emit(SOCKET_EVENT.JOIN_ROOM, roomName);
};

const leaveRoom = () => {
  roomSocket?.off(SOCKET_EVENT.JOIN_ROOM);
  roomSocket?.disconnect();

  roomSocket = null;
  console.log('룸 나감 🥲');
};

export { roomSocket, generateSocket, joinRoom, leaveRoom };
