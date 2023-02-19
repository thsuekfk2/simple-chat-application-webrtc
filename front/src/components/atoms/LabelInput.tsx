import React from 'react';

interface Props {
  label: string;
}
export const LabelInput = ({ label, ...rest }: Props) => {
  return (
    <div className=" relative bg-gray-900 rounded-full ">
      <div className="relative">
        <input
          type="text"
          className="pl-5 w-full peer bg-transparent h-[50px] rounded-full text-gray-200 placeholder-transparent  px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
          placeholder={label}
          {...rest}
        />
        <label
          htmlFor="username"
          className="absolute cursor-text left-3 -top-4 text-sm text-[gray] text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:leading-[19px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
