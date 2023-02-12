import { io } from 'socket.io-client';

let roomSocket: any = null;

const generateSocket = () => {
  if (!roomSocket) {
    roomSocket = io(`http://localhost:3000`, {
      transports: ['websocket', 'polling'],
    });
  } else return;

  console.log('소켓 연결 완료😀 : ', roomSocket);
};

const deleteSocket = () => {
  roomSocket = null;
};

export { roomSocket, generateSocket, deleteSocket };
