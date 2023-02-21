import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface UserInterface {
  username: string | null;
}

const { persistAtom } = recoilPersist({
  key: 'userState',
});

const userState = atom<UserInterface>({
  key: 'userState',
  default: {
    username: 'Anon',
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
