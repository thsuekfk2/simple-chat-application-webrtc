import { useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:3000`);

function App() {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLInputElement>(null);

  const [isEnterRoom, setEnterRoom] = useState(false);

  const submitRoomName = () => {
    socket.emit('join-room', roomNameRef.current?.value);
    if (roomNameRef.current) {
      roomNameRef.current.value = '';
    }

    setEnterRoom(true);
  };

  return (
    <div className="App">
      {isEnterRoom ? (
        <>
          <input ref={message} />
          <button>Send Message</button>
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
