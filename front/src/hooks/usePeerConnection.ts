import { SOCKET_EVENT } from './../adapters/event.enum';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { roomSocket } from '../adapters/roomSocket';
import mediaStreamState from '../store/mediaStreamState';
import peerConnectState from '../store/peerConnectState';

export const usePeerConnection = (roomName?: string | null) => {
  const { myMediaStream } = useRecoilValue(mediaStreamState);
  const { myPeerConnection, myPeersStream, myPeersSocketId } =
    useRecoilValue(peerConnectState);
  const [peerConnectionState, setPeerConnectionState] =
    useRecoilState(peerConnectState);

  const RTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };

  useEffect(() => {
    //피어간의 연결 통로를 만든다.
    const createPeerConnection = (socketId: string) => {
      if (!myMediaStream?.id) {
        console.log('myMediaStream does not exist.');
      }

      const RTCpeerConnection = new RTCPeerConnection(RTCConfig);

      RTCpeerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        console.log('emit ice');
        roomSocket?.emit('ice', event.candidate, roomName, socketId);
      };

      RTCpeerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log('got an event from my peer');
        console.log(event.streams[0]);
        setPeerConnectionState((prev) => ({
          ...prev,
          myPeersStream: {
            ...prev.myPeersStream,
            [socketId]: event.streams[0],
          },
        }));
      };

      RTCpeerConnection.onicegatheringstatechange = (event: Event) => {
        // console.log('ice gathering state changed', event);
      };

      //영상과 오디오 데이터를 주고받기위해 나의 영상과 오디오 정보를 연결점(peerConnection)으로 넣음
      if (myMediaStream?.id) {
        myMediaStream.getTracks().forEach((track) => {
          RTCpeerConnection.addTrack(track, myMediaStream);
        });
      }

      setPeerConnectionState((prev) => ({
        ...prev,
        myPeerConnection: {
          ...prev.myPeerConnection,
          [socketId]: RTCpeerConnection,
        },
      }));

      return RTCpeerConnection;
    };

    const onNewUser = async (socketId: string) => {
      await createOffer(socketId);
    };

    const createOffer = async (socketId: string) => {
      const RTCpeerConnection = createPeerConnection(socketId);
      if (RTCpeerConnection) {
        //offer생성
        const offer = await RTCpeerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        //생성된 offer로 연결 구성
        await RTCpeerConnection.setLocalDescription(
          new RTCSessionDescription(offer)
        );
        console.log('create offer');
        //offer을 다른 피어에게 보냄 (offer가 주고 받아지는 순간 직접적인 대화 가능)
        roomSocket?.emit('offer', offer, roomName, socketId);
        console.log('offer emit');
      }
    };

    // create answer to offer
    const createAnswer = async (
      offer: RTCSessionDescriptionInit,
      socketId: string
    ) => {
      console.log('인기쟁이가 받는 소켓', socketId);
      const RTCpeerConnection = createPeerConnection(socketId);
      if (RTCpeerConnection) {
        //전달받은 offer을 가지고 remoteDescription설정

        await RTCpeerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        //answer 생성
        const answer = await RTCpeerConnection.createAnswer();
        console.log('create answer');
        //생성된 answer을 가지고 setLocalDescription 설정
        await RTCpeerConnection.setLocalDescription(answer);
        // send answer to other user
        console.log('emit answer');
        roomSocket?.emit('answer', answer, roomName, socketId);
      }
    };

    // handle answer made from other user
    const onAnswer = async (message: {
      answer: RTCSessionDescriptionInit;
      socketId: string;
    }) => {
      console.log('on Answer');
      console.log('혹쉬', myPeerConnection[message.socketId].signalingState);
      //전달받은 answer을 가지고 setRemoteDescription 설정
      myPeerConnection[message.socketId]?.setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );
    };

    // handle offer from new user
    const onOffer = async (message: {
      offer: RTCSessionDescriptionInit;
      socketId: string;
    }) => {
      setPeerConnectionState((prev) => ({
        ...prev,
        myPeersSocketId: message.socketId,
      }));

      console.log('on offer');
      await createAnswer(message.offer, message.socketId);
    };

    // handle ice-candidate from other user
    //offer와 answer 받는것을 모두 끝냈을 때, peer-to-peer연결의 양쪽 끝에서 icecandidate라는 이벤트 실행
    const onIceCandidateReceived = (message: {
      ice: RTCIceCandidateInit;
      socketId: string;
    }) => {
      console.log('onononice');
      if (message.ice && myPeerConnection[message.socketId]) {
        myPeerConnection[message.socketId]?.addIceCandidate(message.ice);
      }
    };

    roomSocket?.on(
      SOCKET_EVENT.WELCOME_USER,
      (message: { nickname: string; socketId: string }) => {
        onNewUser(message.socketId);
        console.log('onNewUser');
        setPeerConnectionState((prev) => ({
          ...prev,
          myPeersNickname: {
            ...prev.myPeersNickname,
            [message.socketId]: message.nickname,
          },
          myPeersSocketId: message.socketId,
        }));
      }
    );
    roomSocket?.on('offer', onOffer);
    roomSocket?.on('answer', onAnswer);
    roomSocket?.on('ice', onIceCandidateReceived);

    console.log('peerConnectionState', peerConnectionState);
    return () => {
      roomSocket?.off(SOCKET_EVENT.WELCOME_USER);
      roomSocket?.off('offer');
      roomSocket?.off('answer');
      roomSocket?.off('ice');
    };
  }, [myPeerConnection]);
};
