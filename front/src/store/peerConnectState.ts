import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface PeerConnectionInterface {
  myPeerConnection?: RTCPeerConnection;
  socketId: string;
  myPeerStream: MediaStream | null;
  nickname: string;
}

const { persistAtom } = recoilPersist({
  key: 'peerConnectState',
});

const peerConnectState = atom<PeerConnectionInterface>({
  key: 'peerConnectState',
  default: {
    socketId: '',
    myPeerStream: null,
    nickname: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export default peerConnectState;
