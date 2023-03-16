import { useNavigate } from 'react-router-dom';
import roomListInterface from '../../interface/room.interface';
import Avatar from './AvatarImg';

interface Props {
  room?: roomListInterface;
}

export const OpenRoomItem = ({ room }: Props) => {
  const navigate = useNavigate();

  const enterRoom = (roomName?: string | null) => {
    if (room?.roomCount === 2) {
      alert('인원이 다 찼어요 😢');
      return;
    }
    //디바이스 세팅 페이지 진입
    navigate(`/setting`, {
      state: {
        roomName: roomName,
      },
    });
  };

  return (
    <div
      onClick={() => enterRoom(room?.roomName)}
      className="flex w-[200px] h-[200px] bg-mainColor rounded flex-col items-center justify-center cursor-pointer "
    >
      <Avatar roomId={room?.roomName} />
      <div className=" text-xl pb-3 pt-2">{room?.roomName}</div>
      <div>{`${room?.roomCount} / 2 명 참여중`}</div>
    </div>
  );
};
