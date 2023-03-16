import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import { SoundIcon } from '../atoms/SoundIcon';
import { SwapIcon } from '../atoms/SwapIcon';

import { BsFillCameraVideoOffFill, BsCameraVideoFill } from 'react-icons/bs';

export const ZoomMenuBar = () => {
  const { toggleAudioStream, toggleVideoStream } = useCreateMediaStream();
  return (
    <div className="flex h-[50px] bg-subColor justify-center items-center">
      <SoundIcon toggleClick={toggleAudioStream} />
      <SwapIcon
        on={<BsCameraVideoFill />}
        off={<BsFillCameraVideoOffFill />}
        toggleClick={toggleVideoStream}
      />
    </div>
  );
};
