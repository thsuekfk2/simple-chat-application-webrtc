import { useRecoilState } from 'recoil';
import mediaStreamState from '../store/mediaStreamState';

export const useCreateMediaStream = () => {
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

  return {
    createStream,
  };
};
