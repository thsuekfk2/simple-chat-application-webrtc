import React, { useEffect, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import { roomSocket } from '../../adapters/roomSocket';
import { InputButton } from '../molecules/InputButton';
import messageInterface from '../../interface/message.interface';
import roomListInterface from '../../interface/room.interface';

export const Room = () => {
  const [inputNewMessage, setInputNewMessage] = useState('');
  const [isEnterRoom, setEnterRoom] = useState(false);
  const [chatArray, setChatArray] = useState<messageInterface[]>([]);
  const [publicRoomList, setPublicRoomList] = useState<roomListInterface[]>([]);

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
    roomSocket?.emit('chat-message', inputNewMessage, 'test', () => {
      //마지막 함수는 소켓이 완료되면 호출
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${'Dd'} : ` + inputNewMessage, type: '' },
      ]);
      setInputNewMessage('');
    });
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
    roomSocket?.on('chat-message', (msg: string, user: string) => {
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        { message: `${user} : ` + msg, type: '' },
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
        <div className="pl-4">룸 타이틀</div>
      </div>
      <div className="flex flex-wrap mt-5">
        <div className="flex-1 bg-gray-dark w-full md:min-w-[300px] min-h-[500px]">
          스크린
        </div>
        <div className="text-xs flex flex-col flex-2 bg-subColor w-full md:w-[300px] min-w-[300px] h-[500px] align-middle items-center justify-between">
          {/* 채팅창 */}
          <div>
            {chatArray.map((data, i) => {
              if (data.type === 'notice')
                return (
                  <div
                    className="w-[100%] h-[40px] bg-blue rounded flex items-center justify-center m-3 p-2 "
                    key={i}
                  >
                    {data.message}
                  </div>
                );
            })}
          </div>

          {/* 채팅 입력 */}
          <div className="w-full">
            <InputButton
              value={inputNewMessage || ''}
              onChange={(e) => onMessageChange(e)}
              onKeyDown={onKeyPress}
              label={'Save'}
              submit={submitMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
