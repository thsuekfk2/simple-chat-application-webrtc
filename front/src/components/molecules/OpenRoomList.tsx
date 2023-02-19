import roomListInterface from '../../interface/room.interface';
import { OpenRoomItem } from '../atoms/OpenRoomItem';

interface Props {
  roomList: roomListInterface[];
}

export const OpenRoomList = ({ roomList }: Props) => {
  return (
    <div className="flex flex-wrap overflow-y-auto ml-6 mr-6  justify-center items-center content-center gap-3 ">
      {roomList?.map((room, i) => {
        console.log(room);
        return <OpenRoomItem key={i} room={room} />;
      })}
    </div>
  );
};
