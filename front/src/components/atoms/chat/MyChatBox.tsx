import messageInterface from '../../../interface/message.interface';

interface Props {
  chatData: messageInterface;
  time: string;
}

export const MyChatBox = ({ chatData, time }: Props) => {
  return (
    <div className="chat chat-end" key={chatData.message}>
      <div className="chat-header">
        <time className="text-xs opacity-50 ml-3">{time}</time>
      </div>
      <div className="chat-bubble break-words bg-subColor text-[#000] pt-3.5">
        {chatData.message}
      </div>
    </div>
  );
};
