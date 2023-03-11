import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SOCKET_EVENT } from '../../adapters/event.enum';
import { joinRoom, roomSocket } from '../../adapters/roomSocket';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import mediaStreamState from '../../store/mediaStreamState';
import { Button } from '../atoms/Button';
import { Cam } from '../atoms/Cam';
import { SoundIcon } from '../atoms/SoundIcon';
import { SwapIcon } from '../atoms/SwapIcon';
import { BsFillCameraVideoOffFill, BsCameraVideoFill } from 'react-icons/bs';
import { LabelInput } from '../atoms/LabelInput';

export const Setting = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { createStream } = useCreateMediaStream();

  const { myMediaStream } = useRecoilValue(mediaStreamState);
  const { toggleAudioStream, toggleVideoStream } = useCreateMediaStream();
  const [inputNickname, setNickname] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    createStream();
  }, []);

  useEffect(() => {
    if (videoRef.current && myMediaStream?.id) {
      videoRef.current.srcObject = myMediaStream;
    }
  }, [myMediaStream, videoRef]);

  // 룸 페이지 진입
  const roomPage = () => {
    roomSocket?.emit(SOCKET_EVENT.SAVE_NICKNAME, inputNickname);

    joinRoom(state.roomName);
    navigate(`/room?roomName=${state.roomName}`);
  };

  /** 닉네임 onChange 핸들러 */
  const onNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  return (
    <div className="bg-mainColor w-screen h-screen flex justify-center items-center">
      <div className="w-[400px] left-[200px] h-[500px] bg-subColor flex flex-col justify-between p-8  rounded-lg">
        <div className=" text-2xl flex justify-center p-7">
          {state.roomName}룸 입장 대기
        </div>
        <div className="flex flex-col w-full h-full justify-evenly">
          <div className="flex justify-center flex-col">
            <div className="h-[150px] flex justify-center">
              <Cam videoRef={videoRef} participants={1} />
            </div>
            <div className="flex justify-center">
              <SoundIcon toggleClick={toggleAudioStream} />
              <SwapIcon
                on={<BsCameraVideoFill />}
                off={<BsFillCameraVideoOffFill />}
                toggleClick={toggleVideoStream}
              />
            </div>
          </div>
          <LabelInput
            label={'your name'}
            value={inputNickname || ''}
            onChange={(e) => onNicknameChange(e)}
          />
        </div>
        <div className="w-full flex justify-center p-5">
          <Button onClick={roomPage} label="입장" />
        </div>
      </div>
    </div>
  );
};
