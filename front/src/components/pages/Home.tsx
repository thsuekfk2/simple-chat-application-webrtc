import { useEffect, useState } from 'react';
import { BounceIcon } from '../atoms/BounceIcon';
import { EnterForm } from '../organisms/EnterForm';
import { roomSocket } from '../../adapters/roomSocket';
import { RoomList } from '../organisms/RoomList';
import roomListInterface from '../../interface/room.interface';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';

export const Home = () => {
  const [publicRoomList, setPublicRoomList] = useState<roomListInterface[]>([]);

  /** 전체 public 룸 조회 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on('room-change', (publicRoom: roomListInterface[]) => {
      setPublicRoomList(publicRoom);
    });
    return () => {
      roomSocket?.off('room-change');
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-row overflow-y-hidden">
      <div className="bg-subColor flex h-full w-[50%] min-w-[335px] justify-center">
        <EnterForm />
      </div>
      <div className="relative right-5 bottom-[100px] flex items-center text-2xl sm:text-5xl hover:text-[#4f4f4fee] cursor-pointer">
        <BounceIcon icon={'☺'} />
      </div>
      <RoomList roomList={publicRoomList} />
    </div>
  );
};
