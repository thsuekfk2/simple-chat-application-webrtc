import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SOCKET_EVENT } from '../../adapters/event.enum';
import { roomSocket } from '../../adapters/roomSocket';
import messageInterface from '../../interface/message.interface';
import peerConnectState from '../../store/peerConnectState';
import { ChatBox } from '../molecules/ChatBox';
import { InputButton } from '../molecules/InputButton';

interface Props {
  roomName?: string | null;
}
export const ChatForm = ({ roomName }: Props) => {
  const [chatArray, setChatArray] = useState<messageInterface[]>([]);
  const [inputNewMessage, setInputNewMessage] = useState('');
  const { myPeersSocketId, myPeersNickname, myPeersStream } =
    useRecoilValue(peerConnectState);
  const [, setPeerConnectionState] = useRecoilState(peerConnectState);

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

  /** 유저가 들어왔을 경우 */
  useEffect(() => {
    if (myPeersSocketId.length > 0) {
      setChatArray((prev: messageInterface[]) => [
        ...prev,
        {
          message: `${myPeersNickname[myPeersSocketId]} joined!`,
          type: 'notice',
        },
      ]);
    }
  }, [myPeersSocketId]);

  /** 끊김 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on(
      'bye',
      (message: { myPeersNickname: string; socketId: string }) => {
        console.log('someone lefted !');
        setChatArray((prev: messageInterface[]) => [
          ...prev,
          { message: `${message.myPeersNickname} lefted!`, type: 'notice' },
        ]);
        setPeerConnectionState((prev) => ({
          ...prev,
          myPeersStream: {},
        }));
      }
    );
    return () => {
      roomSocket?.off(SOCKET_EVENT.WELCOME_USER);
      roomSocket?.off('bye');
    };
  }, []);

  return (
    <div className="text-xs flex flex-col flex-2 bg-[#fff] w-full md:w-[300px] min-w-[300px] min-h-[300px] align-middle items-center justify-between ">
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
