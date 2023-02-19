import React from 'react';
import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
}

export const NoticeChatBox = ({ chatData }: Props) => {
  return (
    <div className="chat chat-start " key={chatData.message}>
      <div className="chat-bubble break-words">{chatData.message}</div>
    </div>
  );
};
