import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:3000`);

function App() {
  interface MessageInterface {
    message: string;
  }

  const [inputNewMessage, setInputNewMessage] = useState('');
  const [inputRoomName, setInputRoomName] = useState('');

  const [isEnterRoom, setEnterRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [chatArray, setChatArray] = useState<MessageInterface[]>([]);

  /** 채팅 onChange 핸들러 */
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputNewMessage(event.target.value);
  };

  /** 룸 이름 onChange 핸들러 */
  const onInputRoomNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setInputRoomName(event.target.value);
  };

  /** 채팅 전송 */
  const submitMessage = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    event?.preventDefault();
    socket.emit('chat-message', inputNewMessage, roomName, () => {
      //마지막 함수는 소켓이 완료되면 호출
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: 'you : ' + inputNewMessage },
      ]);
      setInputNewMessage('');
    });
  };

  /** 룸 이름 전송 및 저장 */
  const submitRoomName = () => {
    socket.emit('join-room', inputRoomName);
    setRoomName(inputRoomName); //룸 이름 저장
    setInputRoomName('');
    setEnterRoom(true); //룸 입장
  };

  /** 메세지 키보드 입력 함수 */
  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        submitMessage(event);
      }
    }
  };

  /** 채팅 소켓 메세지 */
  useEffect(() => {
    socket.on('chat-message', (msg) => {
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: 'other : ' + msg },
      ]);
    });
    return () => {
      socket.off('chat-message');
    };
  }, []);

  /** 룸 입장 및 끊김 소켓 메세지 */
  useEffect(() => {
    socket.on('welcome', () => {
      console.log('someone join in!');
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: 'someone joined!' },
      ]);
    });
    socket.on('bye', () => {
      console.log('someone lefted !');
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: 'someone lefted!' },
      ]);
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
          <input
            value={inputNewMessage || ''}
            onChange={(e) => onMessageChange(e)}
            onKeyDown={onKeyPress}
          />
          <button onClick={submitMessage}>Send Message</button>
          <div>Room Name : {roomName}</div>
          {chatArray.map((msg, i) => {
            return <div key={i}>{msg.message}</div>;
          })}
        </>
      ) : (
        <>
          <input
            value={inputRoomName}
            onChange={(e) => onInputRoomNameChange(e)}
          />
          <button onClick={submitRoomName}>Join Room</button>
        </>
      )}
    </div>
  );
}

export default App;
