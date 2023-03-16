import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

interface Props {
  roomId?: string;
}

function Avatar({ roomId }: Props) {
  const avatar = useMemo(() => {
    return createAvatar(thumbs, {
      seed: roomId,
      backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
      eyes: [
        'variant1W10',
        'variant2W12',
        'variant3W14',
        'variant4W16',
        'variant6W10',
        'variant7W12',
        'variant8W14',
        'variant9W16',
      ],
      eyesColor: ['000000', 'ffffff'],
      face: ['variant1', 'variant2', 'variant3', 'variant4', 'variant5'],
      faceOffsetX: [-15, 15],
      faceOffsetY: [-15, 15],
      mouth: ['variant1', 'variant2', 'variant3', 'variant4', 'variant5'],
      shapeColor: ['0a5b83', '1c799f', '69d2e7', 'f1f4dc', 'f88c49'],
      randomizeIds: true,
    }).toDataUriSync();
  }, []);

  return <img src={avatar} alt="" className="w-[100px] rounded-full" />;
}

export default Avatar;
