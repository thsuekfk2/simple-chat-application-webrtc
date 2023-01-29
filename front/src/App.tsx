import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:3000`);

function App() {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLInputElement>(null);

  const [isEnterRoom, setEnterRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [chatArray, setChatArray] = useState<String[]>([]);

  const submitRoomName = () => {
    socket.emit('join-room', roomNameRef.current?.value);

    if (roomNameRef.current) {
      setRoomName(roomNameRef.current?.value);
      roomNameRef.current.value = '';
    }

    setEnterRoom(true);
  };

  useEffect(() => {
    socket.on('welcome', () => {
      console.log('someone join in!');
      setChatArray((prev) => [...prev, 'somone joined!']);
    });
    socket.on('bye', () => {
      console.log('someone lefted !');
      setChatArray((prev) => [...prev, 'someone lefted!']);
    });
    return () => {
      socket.off('welcome');
      socket.off('bye');
    };
  }, []);

  return (
    <div className="App">
      {isEnterRoom ? (
        <>
          <input ref={message} />
          <button>Send Message</button>
          <div>Room Name : {roomName}</div>
          <div>{chatArray}</div>
        </>
      ) : (
        <>
          <input ref={roomNameRef} />
          <button onClick={submitRoomName}>Join Room</button>
        </>
      )}
    </div>
  );
}

export default App;
