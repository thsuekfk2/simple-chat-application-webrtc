import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../atoms/AvatarImg';
import {
  generateSocket,
  joinRoom,
  roomSocket,
} from '../../adapters/roomSocket';
import { useLocation } from 'react-router-dom';
import { ChatForm } from '../organisms/ChatForm';
import { SoundIcon } from '../atoms/SoundIcon';
import { SwapIcon } from '../atoms/SwapIcon';
import { useRecoilValue } from 'recoil';
import mediaStreamState from '../../store/mediaStreamState';
import peerConnectState from '../../store/peerConnectState';
import { usePeerConnection } from '../../hooks/usePeerConnection';

export const Room = () => {
  const location = useLocation();
  const [roomName, setRoomName] = useState<string | null>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<HTMLVideoElement | null>(null);

  const { myMediaStream } = useRecoilValue(mediaStreamState);
  const { myPeerStream } = useRecoilValue(peerConnectState);

  /** querystring 추출 함수 */
  const getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    if (videoRef.current && myMediaStream?.id) {
      videoRef.current.srcObject = myMediaStream;
    }
  }, [myMediaStream, videoRef]);

  useEffect(() => {
    if (peerRef.current && myPeerStream?.id) {
      console.log('myPeerStream', myPeerStream);
      peerRef.current.srcObject = myPeerStream;
    }
  }, [myPeerStream, peerRef]);

  useEffect(() => {
    //룸 이름 저장
    setRoomName(getParameter('roomName'));

    //소켓이 없을 경우 재 연결
    if (!roomSocket) {
      generateSocket();
      joinRoom(getParameter('roomName'));
    }
  }, []);

  usePeerConnection(roomName);

  return (
    <div className=" bg-mainColor w-full h-screen overflow-y-auto flex flex-col">
      <div className="flex justify-start items-center m-2">
        <Avatar roomId={'test'} />
        <div className="pl-4">{roomName}</div>
      </div>
      <div className="flex h-full w-full flex-wrap max-h-[80%]">
        <div className="flex  flex-col justify-between flex-1 bg-gray-dark w-full h-full md:min-w-[300px] ">
          <div className="flex w-full justify-center h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-[50%]"
            />
            {myPeerStream?.id && (
              <video
                ref={peerRef}
                autoPlay
                muted
                playsInline
                className="w-[50%]"
              />
            )}
          </div>
          <div className="flex h-[50px] bg-subColor justify-center items-center">
            <SoundIcon />
            <SwapIcon on={'on'} off={'off'} />
          </div>
        </div>
        <ChatForm roomName={roomName} />
      </div>
    </div>
  );
};
