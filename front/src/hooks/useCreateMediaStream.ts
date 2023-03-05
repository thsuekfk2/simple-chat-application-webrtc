import { useRecoilState, useRecoilValue } from 'recoil';
import mediaStreamState from '../store/mediaStreamState';

export const useCreateMediaStream = () => {
  const { myMediaStream } = useRecoilValue(mediaStreamState);
  const [myStream, setMyStream] = useRecoilState(mediaStreamState);
  const initialConstraints = {
    audio: true,
    video: true,
  };

  const createStream = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia(
        initialConstraints
      );
      setMyStream({ ...myStream, myMediaStream: videoStream });
      console.log('나의 비디오 stream', videoStream);
      return;
    } catch (error) {
      console.log('failed to get stream', error);
      return;
    }
  };

  /** 오디오 토글 */
  const toggleAudioStream = () => {
    if (myMediaStream?.id) {
      myMediaStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    } else {
      console.log('myStream doesnt exist', myStream);
    }
  };

  /** 비디오 토글 */
  const toggleVideoStream = () => {
    if (myMediaStream?.id) {
      myMediaStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    } else {
      console.log('myStream doesnt exist', myStream);
    }
  };

  const stopStream = () => {
    if (myMediaStream?.id) {
      myMediaStream.getTracks().forEach((track) => track.stop());
    } else {
      console.log('myStream doesnt exist', myStream);
    }
  };

  return {
    createStream,
    stopStream,
    toggleVideoStream,
    toggleAudioStream,
  };
};
