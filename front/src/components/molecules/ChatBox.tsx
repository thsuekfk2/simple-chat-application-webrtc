import React, { useEffect, useRef } from 'react';
import messageInterface from '../../interface/message.interface';
import { MyChatBox } from '../atoms/chat/MyChatBox';
import { NoticeChatBox } from '../atoms/chat/NoticeChatBox';
import { YourChatBox } from '../atoms/chat/YourChatBox';

interface Props {
  chatArray: messageInterface[];
}
export const ChatBox = ({ chatArray }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //채팅 입력 시 스크롤 맨 아래로 이동
    if (null !== divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, [chatArray]);

  return (
    <div className="flex flex-col w-[100%] overflow-auto">
      {chatArray.map((data, i) => {
        if (data.type === 'notice')
          return <NoticeChatBox chatData={data} key={i} />;
        if (data.type === 'me') return <MyChatBox chatData={data} key={i} />;
        if (data.type === 'user')
          return <YourChatBox chatData={data} key={i} />;
      })}
      <div ref={divRef} />
    </div>
  );
};
