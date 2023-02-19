import roomListInterface from '../../interface/room.interface';
import { OpenRoomTitle } from '../atoms/OpenRoomTitle';
import { OpenRoomList } from '../molecules/OpenRoomList';

interface Props {
  roomList: roomListInterface[];
}

export const RoomList = ({ roomList }: Props) => {
  return (
    <div className=" flex flex-col bg-gray-light h-full w-3/5 min-w-[300px] items-center justify-center gap-4 z-[1] snap-x scroll-smooth">
      <OpenRoomTitle roomList={roomList} />
      <OpenRoomList roomList={roomList} />
    </div>
  );
};
