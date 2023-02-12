import { BounceIcon } from '../atoms/BounceIcon';
import { EnterForm } from '../organisms/EnterForm';

export const Home = () => {
  const publicRoomListDummy = [
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
    { roomName: 'dd', roomCount: 1 },
  ];
  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden">
      <div className="bg-subColor flex h-full w-2/5 min-w-[335px] justify-center">
        <EnterForm />
      </div>
      <div className=" relative right-4 flex items-center text-2xl sm:text-5xl">
        <BounceIcon icon={'☺'} />
      </div>

      <div className="flex flex-col bg-gray-light h-full w-3/5 min-w-[200px] items-center justify-center gap-4">
        <div className=" font-bold text-lg"> 열려있는 채팅방들 👀 </div>
        <div className="flex flex-wrap overflow-y-auto  justify-center items-center content-center gap-3">
          {publicRoomListDummy.length === 0 && (
            <div>열려있는게 없네요 ㅜ.ㅜ</div>
          )}
          {publicRoomListDummy?.map((room, i) => {
            return (
              <div
                key={i}
                className="flex w-[200px] h-[100px] bg-mainColor rounded"
              >{`${room?.roomName}(${room?.roomCount})`}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
