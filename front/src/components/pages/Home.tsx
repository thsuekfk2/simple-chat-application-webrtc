import { useEffect, useState } from 'react';
import { BounceIcon } from '../atoms/BounceIcon';
import { OpenRoomItem } from '../atoms/OpenRoomItem';
import { EnterForm } from '../organisms/EnterForm';
import { roomSocket } from '../../adapters/roomSocket';

interface publicRoomLisType {
  roomName: string;
  roomCount: number;
}

export const Home = () => {
  const [publicRoomList, setPublicRoomList] = useState<
    Array<publicRoomLisType>
  >([]);

  /** 전체 public 룸 조회 소켓 메세지 */
  useEffect(() => {
    roomSocket?.on('room-change', (publicRoom: Array<publicRoomLisType>) => {
      console.log(publicRoom);
      setPublicRoomList(publicRoom);
    });
    return () => {
      roomSocket?.off('room-change');
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-row overflow-y-hidden">
      <div className="bg-subColor flex h-full w-2/5 min-w-[335px] justify-center">
        <EnterForm />
      </div>
      <div className="relative right-5 bottom-[100px] flex items-center text-2xl sm:text-5xl hover:text-[#4f4f4fee] cursor-pointer">
        <BounceIcon icon={'☺'} />
      </div>

      <div className=" flex flex-col bg-gray-light h-full w-3/5 min-w-[300px] items-center justify-center gap-4 z-[1] snap-x scroll-smooth">
        {publicRoomList?.length === 0 ? (
          <div className=" p-10">열려있는 채팅방이 없어요..🥲</div>
        ) : (
          <div className=" font-bold text-lg"> 열려있는 채팅방들 👀 </div>
        )}
        <div className="flex flex-wrap overflow-y-auto ml-6 mr-6  justify-center items-center content-center gap-3 ">
          {publicRoomList?.map((room, i) => {
            console.log(room);
            return <OpenRoomItem key={i} room={room} />;
          })}
        </div>
      </div>
    </div>
  );
};
