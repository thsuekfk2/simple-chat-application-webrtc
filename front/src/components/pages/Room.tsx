import React, { useState } from 'react';

type RoomList = {
  roomName: String;
  roomCount: Number;
};

export const Room = () => {
  interface MessageInterface {
    message: string;
  }

  const [inputNewMessage, setInputNewMessage] = useState('');
  const [isEnterRoom, setEnterRoom] = useState(false);
  const [chatArray, setChatArray] = useState<MessageInterface[]>([]);
  const [publicRoomList, setPublicRoomList] = useState<RoomList[]>([]);

  /** 채팅 onChange 핸들러 */
  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputNewMessage(event.target.value);
  };

  // useEffect(() => {
  //   generateSocket();
  // }, []);

  /** 채팅 전송 */
  // const submitMessage = (
  //   event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  // ) => {
  //   event?.preventDefault();
  //   roomSockets.emit('chat-message', inputNewMessage, roomName, () => {
  //     //마지막 함수는 소켓이 완료되면 호출
  //     setChatArray((prev: MessageInterface[]) => [
  //       ...prev,
  //       { message: `${inputNickname} : ` + inputNewMessage },
  //     ]);
  //     setInputNewMessage('');
  //   });
  // };

  /** 메세지 키보드 입력 함수 */
  // const onKeyPress = (event: React.KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     if (!event.shiftKey) {
  //       event.preventDefault();
  //       submitMessage(event);
  //     }
  //   }
  // };

  /** 전체 public 룸 조회 소켓 메세지 */
  // useEffect(() => {
  //   roomSockets.on('room-change', (publicRoom: string) => {
  //     console.log(publicRoom);
  //     setPublicRoomList(publicRoom);
  //   });
  //   return () => {
  //     roomSockets.off('room-change');
  //   };
  // }, []);

  /** 채팅 소켓 메세지 */
  // useEffect(() => {
  //   roomSockets.on('chat-message', (msg: string, user: string) => {
  //     setChatArray((prev: MessageInterface[]) => [
  //       ...prev,
  //       { message: `${user} : ` + msg },
  //     ]);
  //   });
  //   return () => {
  //     roomSockets.off('chat-message');
  //   };
  // }, []);

  /** 룸 입장 및 끊김 소켓 메세지 */
  // useEffect(() => {
  //   roomSockets.on('welcome', (user: string) => {
  //     console.log('someone join in!');
  //     setChatArray((prev: MessageInterface[]) => [
  //       ...prev,
  //       { message: `${user} joined!` },
  //     ]);
  //   });
  //   roomSockets.on('bye', (user: string) => {
  //     console.log('someone lefted !');
  //     setChatArray((prev: MessageInterface[]) => [
  //       ...prev,
  //       { message: `${user} lefted!` },
  //     ]);
  //   });
  //   return () => {
  //     roomSockets.off('welcome');
  //     roomSockets.off('bye');
  //   };
  // }, []);

  return <div>채팅 룸 페이지</div>;
};
