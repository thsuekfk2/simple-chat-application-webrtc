import React, { useEffect, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import {
  generateSocket,
  joinRoom,
  roomSocket,
} from '../../adapters/roomSocket';
import { InputButton } from '../molecules/InputButton';
import messageInterface from '../../interface/message.interface';
import { useLocation } from 'react-router-dom';

export const Room = () => {
  const location = useLocation();
  const [roomName, setRoomName] = useState<string | null>('');

  const [inputNewMessage, setInputNewMessage] = useState('');
  const [chatArray, setChatArray] = useState<messageInterface[]>([]);

  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    //룸 이름 저장
    setRoomName(getParameter('roomName'));

    //소켓이 없을 경우 재 연결
    if (!roomSocket) {
      generateSocket();
      joinRoom(getParameter('roomName'));
    }

    return () => {
      roomSocket?.off('welcome');
      roomSocket?.off('bye');
    };
  }, []);

  /** 채팅 onChange 핸들러 */
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputNewMessage(event.target.value);
  };

  /** 채팅 전송 */
  const submitMessage = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    event?.preventDefault();
    roomSocket?.emit('chat-message', inputNewMessage, roomName, () => {
      //마지막 함수는 소켓이 완료되면 호출
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${'me'} : ` + inputNewMessage, type: 'me' },
      ]);
      setInputNewMessage('');
    });
  };

  /** 메세지 키보드 입력 함수 */
  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey && event.nativeEvent.isComposing === false) {
        event.preventDefault();
        submitMessage(event);
      }
    }
  };

  /** 채팅 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on('chat-message', (msg: string, user: string) => {
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${user} : ` + msg, type: 'user' },
      ]);
    });
    return () => {
      roomSocket?.off('chat-message');
    };
  }, []);

  /** 룸 입장 및 끊김 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on('welcome', (user: string) => {
      console.log('someone join in!');
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${user} joined!`, type: 'notice' },
      ]);
    });
    roomSocket?.on('bye', (user: string) => {
      console.log('someone lefted !');
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${user} lefted!`, type: 'notice' },
      ]);
    });
    return () => {
      roomSocket?.off('welcome');
      roomSocket?.off('bye');
    };
  }, []);

  return (
    <div className=" bg-mainColor w-full h-screen overflow-y-auto">
      <div className="flex justify-start items-center m-2">
        <Avatar roomId={'test'} />
        <div className="pl-4">{roomName}</div>
      </div>
      <div className="flex flex-wrap mt-5">
        <div className="flex-1 bg-gray-dark w-full md:min-w-[300px] min-h-[500px]">
          스크린
        </div>
        <div className="text-xs flex flex-col flex-2 bg-[#fff] w-full md:w-[300px] min-w-[300px] h-[500px] align-middle items-center justify-between ">
          {/* 채팅창 */}
          <div className="flex flex-col w-[100%] overflow-auto">
            {chatArray.map((data, i) => {
              if (data.type === 'notice')
                return (
                  <div
                    className="w-[100%] h-[40px] bg-mainColor rounded flex items-center justify-center mb-2 mt-2 p-2 "
                    key={data.message}
                  >
                    {data.message}
                  </div>
                );
              if (data.type === 'me')
                return (
                  <div className="flex w-[100%] justify-end" key={data.message}>
                    <div className=" relative w-max[80%] h-[40px] bg-subColor rounded flex items-center  mb-2 mt-2 p-2 justify-end ">
                      {data.message}
                    </div>
                  </div>
                );
              if (data.type === 'user')
                return (
                  <div
                    className="flex w-[100%] justify-start"
                    key={data.message}
                  >
                    <div className="w-max[80%] h-[40px] bg-[#ffff] rounded flex items-center mb-2 mt-2 p-2 ">
                      {data.message}
                    </div>
                  </div>
                );
            })}
          </div>
          {/* 채팅 입력 */}
          <div className="flex w-full">
            <InputButton
              value={inputNewMessage || ''}
              onChange={(e) => onMessageChange(e)}
              onKeyDown={onKeyPress}
              buttonLabel={'Send'}
              submit={submitMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
