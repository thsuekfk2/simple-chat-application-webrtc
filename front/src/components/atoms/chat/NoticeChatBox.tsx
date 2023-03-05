import React from 'react';
import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
}

export const NoticeChatBox = ({ chatData }: Props) => {
  return (
    <div className="chat flex justify-center" key={chatData.message}>
      <div className="chat-bubble break-words pt-[14px]">
        {chatData.message}
      </div>
    </div>
  );
};
