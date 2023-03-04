import React from 'react';
import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
  time: string;
}

export const YourChatBox = ({ chatData, time }: Props) => {
  return (
    <div className="chat chat-start" key={chatData.message}>
      <div className="chat-header">
        {chatData.name}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className="chat-bubble break-words  bg-[#ddd] text-[#000] pt-3.5">
        {chatData.message}
      </div>
    </div>
  );
};
