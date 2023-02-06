import React from 'react';

interface Props {
  label: string;
  onClick?(): void;
}

export const Button = ({ label, onClick, ...rest }: Props) => {
  return (
    <div
      className="bg-mainColor hover:bg-hoverColor text-gray-dark flex h-[40px] w-[100px] items-center justify-center rounded bg-gray-400 text-sm font-bold hover:cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
  );
};
