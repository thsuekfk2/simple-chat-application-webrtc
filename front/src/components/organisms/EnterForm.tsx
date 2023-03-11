import React, { useEffect, useState } from 'react';
import { InputButton } from '../molecules/InputButton';
import { generateSocket } from '../../adapters/roomSocket';
import { useNavigate } from 'react-router-dom';

export const EnterForm = () => {
  const navigate = useNavigate();

  const [inputRoomName, setInputRoomName] = useState('');

  useEffect(() => {
    generateSocket();
  }, []);

  /** 룸 이름 onChange 핸들러 */
  const onInputRoomNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setInputRoomName(event.target.value);
  };

  /** 룸 이름 전송 및 저장 */
  const submitRoomName = () => {
    setInputRoomName('');
    //디바이스 세팅 페이지 진입
    navigate(`/setting`, {
      state: {
        roomName: inputRoomName,
      },
    });
  };

  return (
    <div className=" absolute flex h-full flex-col items-center justify-center gap-4 w-[300px]">
      <div className="text-xl font-bold pb-5">Welcome 👋</div>
      <InputButton
        inputLabel="Room name"
        value={inputRoomName}
        onChange={(e) => onInputRoomNameChange(e)}
        submit={submitRoomName}
        buttonLabel={'Enter'}
      />
    </div>
  );
};
