import { useEffect, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import {
  generateSocket,
  joinRoom,
  roomSocket,
  leaveRoom,
} from '../../adapters/roomSocket';
import { ChatForm } from '../organisms/ChatForm';
import { usePeerConnection } from '../../hooks/usePeerConnection';
import { ZoomForm } from '../organisms/ZoomForm';
import { getQueryString } from '../../utils/getQueryString';
import { useNavigate } from 'react-router-dom';

export const Room = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState<string | null>('');

  useEffect(() => {
    //룸 이름 저장
    setRoomName(getQueryString('roomName'));

    //소켓이 없을 경우 재 연결
    if (!roomSocket) {
      generateSocket();
      joinRoom(getQueryString('roomName'));
    }

    if (!roomSocket?.id) {
      alert('잘못된 접근이네요 😢');
      leaveRoom();
      navigate('/');
      return;
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
