import React, { useEffect, useState } from 'react';
import { InputButton } from '../molecules/InputButton';
import { generateSocket, roomSocket } from '../../adapters/roomSocket';
import { SOCKET_EVENT } from '../../adapters/event.enum';
import { useNavigate } from 'react-router-dom';

export const EnterForm = () => {
  const navigate = useNavigate();

  const [inputRoomName, setInputRoomName] = useState('');
  const [inputNickname, setNickname] = useState('');
  const [isSaveName, setSaveName] = useState(false);

  useEffect(() => {
    generateSocket();
  }, []);

  /** 닉네임 onChange 핸들러 */
  const onNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  /** 닉네임 전송 및 저장 */
  const submitNickname = () => {
    roomSocket?.emit(SOCKET_EVENT.SAVE_NICKNAME, inputNickname);
    setSaveName(true);
  };

  /** 룸 이름 onChange 핸들러 */
  const onInputRoomNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setInputRoomName(event.target.value);
  };

  /** 룸 이름 전송 및 저장 */
  const submitRoomName = () => {
    //닉네임 미지정 시 초기 닉네임 설정
    if (inputNickname === '') {
      setNickname('me');
    }
    roomSocket?.emit(SOCKET_EVENT.JOIN_ROOM, inputRoomName);
    // setRoomName(inputRoomName); //룸 이름 저장
    setInputRoomName('');
    // 룸 페이지 진입
    navigate(`/room?roomName=${inputRoomName}`);
  };

  return (
    <div className=" absolute flex h-full flex-col items-center justify-center gap-4 w-[300px]">
      <div className="text-xl font-bold pb-5">
        {isSaveName
          ? `Hello ${inputNickname ? inputNickname : 'Anon'}님 👋`
          : 'What your name ? 🤔'}
      </div>
      {isSaveName ? (
        <>
          <button
            className="absolute right-5 cursor-pointer text-xs hover:text-hoverColor"
            onClick={() => {
              setSaveName(false);
              setNickname('');
            }}
          >
            Edit name
          </button>
          <InputButton
            inputLabel="Room name"
            value={inputRoomName}
            onChange={(e) => onInputRoomNameChange(e)}
            submit={submitRoomName}
            buttonLabel={'Enter'}
          />
        </>
      ) : (
        <InputButton
          inputLabel="your name"
          value={inputNickname || ''}
          onChange={(e) => onNicknameChange(e)}
          submit={submitNickname}
          buttonLabel={'Save'}
        />
      )}
    </div>
  );
};
