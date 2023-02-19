import React from 'react';
import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
}

export const YourChatBox = ({ chatData }: Props) => {
  return (
    <div className="chat chat-start" key={chatData.message}>
      {/* <div className="chat-image avatar">
    <div className="w-10 rounded-full">image</div>
  </div> */}
      <div className="chat-header">
        {chatData.name}
        <time className="text-xs opacity-50 ml-2">12:45</time>
      </div>
      <div className="chat-bubble break-words  bg-[#ddd] text-[#000]">
        {chatData.message}
      </div>
    </div>
  );
};
