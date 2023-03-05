import React, { useEffect, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import {
  generateSocket,
  joinRoom,
  roomSocket,
} from '../../adapters/roomSocket';
import { useLocation } from 'react-router-dom';
import { ChatForm } from '../organisms/ChatForm';
import { usePeerConnection } from '../../hooks/usePeerConnection';
import { ZoomForm } from '../organisms/ZoomForm';

export const Room = () => {
  const location = useLocation();
  const [roomName, setRoomName] = useState<string | null>('');

  /** querystring 추출 함수 */
  const getParameter = (key: string) => {
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
  }, []);

  usePeerConnection(roomName);

  return (
    <div className=" bg-mainColor w-full h-screen overflow-y-auto flex flex-col">
      <div className="flex justify-start items-center m-2">
        <Avatar roomId={'test'} />
        <div className="pl-4">{roomName}</div>
      </div>
      <div className="flex h-full w-full flex-wrap max-h-[80%]">
        <ZoomForm />
        <ChatForm roomName={roomName} />
      </div>
    </div>
  );
};
