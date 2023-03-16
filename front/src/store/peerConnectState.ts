import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface PeerConnectionInterface {
  myPeerConnection: any;
  // myPeerConnection: myPeerConnection[];
  // myPeersSocketId: string[];
  // myPeersStream: MediaStream[];
  // myPeersNickname: string[];
  myPeersSocketId: any;
  myPeersStream: any;
  myPeersNickname: any;
}

const { persistAtom } = recoilPersist({
  key: 'peerConnectState',
});

const peerConnectState = atom<PeerConnectionInterface>({
  key: 'peerConnectState',
  default: {
    myPeerConnection: [],
    myPeersSocketId: [],
    myPeersStream: [],
    myPeersNickname: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default peerConnectState;
