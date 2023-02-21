import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface MediaStreamInterface {
  myMediaStream: MediaStream | null;
}

const { persistAtom } = recoilPersist({
  key: 'mediaStreamState',
});

const mediaStreamState = atom<MediaStreamInterface>({
  key: 'mediaStreamState',
  default: {
    myMediaStream: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default mediaStreamState;
