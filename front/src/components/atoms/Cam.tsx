import { RefObject } from 'react';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoRef: RefObject<HTMLVideoElement>;
  participants: number | null;
}

export const Cam = ({ videoRef, participants, ...rest }: Props) => {
  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      {...rest}
      className={participants != 1 ? 'w-[50%] min-w-[300px]' : 'max-w-[90%]'}
    />
  );
};
