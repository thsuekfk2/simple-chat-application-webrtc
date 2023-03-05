import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import mediaStreamState from '../../store/mediaStreamState';
import peerConnectState from '../../store/peerConnectState';
import { Cam } from '../atoms/Cam';
import { SoundIcon } from '../atoms/SoundIcon';
import { SwapIcon } from '../atoms/SwapIcon';

export const ZoomForm = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<HTMLVideoElement | null>(null);

  const { myMediaStream } = useRecoilValue(mediaStreamState);
  const { myPeerStream } = useRecoilValue(peerConnectState);

  const { toggleAudioStream, toggleVideoStream } = useCreateMediaStream();

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

  return (
    <div className="flex  flex-col justify-between flex-1 bg-gray-dark w-full h-full md:min-w-[300px] ">
      <div className="flex w-full justify-center h-full">
        <Cam videoRef={videoRef} participants={myPeerStream?.id ? 2 : 1} />
        {myPeerStream?.id && <Cam videoRef={peerRef} participants={2} />}
      </div>
      <div className="flex h-[50px] bg-subColor justify-center items-center">
        <SoundIcon toggleClick={toggleAudioStream} />
        <SwapIcon on={'on'} off={'off'} toggleClick={toggleVideoStream} />
      </div>
    </div>
  );
};
