import React from 'react';
import roomListInterface from '../../interface/room.interface';

interface Props {
  roomList: roomListInterface[];
}

export const OpenRoomTitle = ({ roomList }: Props) => {
  return (
    <div>
      {roomList?.length === 0 ? (
        <div className=" p-10">열려있는 채팅방이 없어요..🥲</div>
      ) : (
        <div className=" font-bold text-lg"> 열려있는 채팅방들 👀 </div>
      )}
    </div>
  );
};
