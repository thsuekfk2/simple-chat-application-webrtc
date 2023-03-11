import { RefObject } from 'react';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoRef: RefObject<HTMLVideoElement>;
  participants: number;
}

export const Cam = ({ videoRef, participants, ...rest }: Props) => {
  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      {...rest}
      className={participants != 1 ? 'w-[50%]' : 'max-w-[90%]'}
    />
  );
};
