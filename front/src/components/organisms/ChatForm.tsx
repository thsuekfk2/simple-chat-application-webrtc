import React, { useEffect, useState } from 'react';
import { roomSocket } from '../../adapters/roomSocket';
import messageInterface from '../../interface/message.interface';
import { ChatBox } from '../molecules/ChatBox';
import { InputButton } from '../molecules/InputButton';

interface Props {
  roomName?: string | null;
}
export const ChatForm = ({ roomName }: Props) => {
  const [chatArray, setChatArray] = useState<messageInterface[]>([]);

  const [inputNewMessage, setInputNewMessage] = useState('');

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
        { message: inputNewMessage, type: 'me', name: 'me' },
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
        { message: msg, type: 'user', name: user },
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
    <div className="text-xs flex flex-col flex-2 bg-[#fff] w-full md:w-[300px] min-w-[300px] h-[500px] align-middle items-center justify-between ">
      {/* 채팅창 */}
      <ChatBox chatArray={chatArray} />
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
  );
};