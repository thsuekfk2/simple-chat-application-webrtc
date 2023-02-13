import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../../adapters/roomSocket';
import Avatar from './AvatarImg';

interface Props {
  room?: {
    roomName: string;
    roomCount: number;
  };
}

export const OpenRoomItem = ({ room }: Props) => {
  const navigate = useNavigate();

  const enterRoom = (roomName?: string) => {
    joinRoom(roomName);
    navigate('/room', { replace: true });
  };

  return (
    <div
      onClick={() => enterRoom(room?.roomName)}
      className="flex w-[200px] h-[200px] bg-mainColor rounded flex-col items-center justify-center cursor-pointer "
    >
      <Avatar roomId={room?.roomName} />
      <div className=" text-xl pb-3 pt-2">{room?.roomName}</div>
      <div>{`${room?.roomCount} 명 참여중`}</div>
    </div>
  );
};
