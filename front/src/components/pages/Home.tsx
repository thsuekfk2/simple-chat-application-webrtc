import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BounceIcon } from '../atoms/BounceIcon';
import { Button } from '../atoms/Button';
import { InputButton } from '../molecules/InputButton';

const socket = io(`http://localhost:3000`);

type RoomList = {
  roomName: String;
  roomCount: Number;
};
export const Home = () => {
  interface MessageInterface {
    message: string;
  }

  const [inputNewMessage, setInputNewMessage] = useState('');
  const [inputRoomName, setInputRoomName] = useState('');
  const [inputNickname, setNickname] = useState('');

  const [isEnterRoom, setEnterRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [chatArray, setChatArray] = useState<MessageInterface[]>([]);

  const [publicRoomList, setPublicRoomList] = useState<RoomList[]>([]);

  /** 닉네임 onChange 핸들러 */
  const onNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

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
        { message: `${inputNickname} : ` + inputNewMessage },
      ]);
      setInputNewMessage('');
    });
  };

  /** 룸 이름 전송 및 저장 */
  const submitRoomName = () => {
    //닉네임 미지정 시 초기 닉네임 설정
    if (inputNickname === '') {
      setNickname('me');
    }
    socket.emit('join-room', inputRoomName);
    setRoomName(inputRoomName); //룸 이름 저장
    setInputRoomName('');
    setEnterRoom(true); //룸 입장
  };

  /** 닉네임 전송 및 저장 */
  const submitNickname = () => {
    socket.emit('nick-name', inputNickname);
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

  /** 전체 public 룸 조회 소켓 메세지 */
  useEffect(() => {
    socket.on('room-change', (publicRoom) => {
      console.log(publicRoom);
      setPublicRoomList(publicRoom);
    });
    return () => {
      socket.off('room-change');
    };
  }, []);

  /** 채팅 소켓 메세지 */
  useEffect(() => {
    socket.on('chat-message', (msg, user) => {
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: `${user} : ` + msg },
      ]);
    });
    return () => {
      socket.off('chat-message');
    };
  }, []);

  /** 룸 입장 및 끊김 소켓 메세지 */
  useEffect(() => {
    socket.on('welcome', (user) => {
      console.log('someone join in!');
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: `${user} joined!` },
      ]);
    });
    socket.on('bye', (user) => {
      console.log('someone lefted !');
      setChatArray((prev: MessageInterface[]) => [
        ...prev,
        { message: `${user} lefted!` },
      ]);
    });
    return () => {
      socket.off('welcome');
      socket.off('bye');
    };
  }, []);

  return (
    <div className="h-screen w-screen ">
      <div className="bg-subColor fix absolute h-full w-4/5 min-w-[330px] transition-all md:w-3/5 lg:w-2/5">
        <div className="absolute left-[97%] top-[48%] text-2xl sm:text-5xl">
          <BounceIcon icon={'☺'} />
        </div>
        {isEnterRoom ? (
          <>
            <input
              value={inputNewMessage || ''}
              onChange={(e) => onMessageChange(e)}
              onKeyDown={onKeyPress}
            />
            <Button label="Send Message" onClick={() => submitMessage} />
            <div>Room Name : {roomName}</div>
            {chatArray.map((msg, i) => {
              return <div key={i}>{msg.message}</div>;
            })}
          </>
        ) : (
          <div className=" absolute flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="text-xl">Welcome 👋</div>
            <InputButton
              placeholder="your name"
              value={inputNickname || ''}
              onChange={(e: any) => onNicknameChange(e)}
              submit={submitNickname}
              label={'Save'}
            />
            <InputButton
              placeholder="Room name"
              value={inputRoomName}
              onChange={(e) => onInputRoomNameChange(e)}
              submit={submitRoomName}
              label={'Enter'}
            />
          </div>
        )}
        {!isEnterRoom &&
          publicRoomList.map((room) => {
            return <div>{`${room?.roomName}(${room?.roomCount})`}</div>;
          })}
      </div>
    </div>
  );
};
