import React, { useEffect, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import {
  generateSocket,
  joinRoom,
  roomSocket,
} from '../../adapters/roomSocket';
import { useLocation } from 'react-router-dom';
import { ChatForm } from '../organisms/ChatForm';

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
        <ChatForm roomName={roomName} />
      </div>
    </div>
  );
};
