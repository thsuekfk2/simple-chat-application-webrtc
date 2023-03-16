import { useEffect, useState } from 'react';
import { BounceIcon } from '../atoms/BounceIcon';
import { EnterForm } from '../organisms/EnterForm';
import { roomSocket } from '../../adapters/roomSocket';
import { RoomList } from '../organisms/RoomList';
import roomListInterface from '../../interface/room.interface';

export const Home = () => {
  const [publicRoomList, setPublicRoomList] = useState<roomListInterface[]>([]);

  /** 전체 public 룸 조회 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on('room-change', (publicRoom: roomListInterface[]) => {
      setPublicRoomList(publicRoom);
    });
    localStorage.clear();
    return () => {
      roomSocket?.off('room-change');
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-row overflow-y-hidden">
      <div className="bg-subColor flex h-full w-[50%] min-w-[335px] justify-center">
        <EnterForm />
      </div>
      <RoomList roomList={publicRoomList} />
    </div>
  );
};
