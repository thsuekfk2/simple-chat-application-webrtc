import React from 'react';
import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
}

export const MyChatBox = ({ chatData }: Props) => {
  return (
    <div className="chat chat-end" key={chatData.message}>
      {/* <div className="chat-image avatar">
    <div className="w-10 rounded-full">image</div>
  </div> */}
      <div className="chat-header">
        <time className="text-xs opacity-50 ml-3">12:46</time>
      </div>
      <div className="chat-bubble break-words bg-subColor text-[#000]">
        {chatData.message}
      </div>
    </div>
  );
};
