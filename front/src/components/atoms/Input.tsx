import React from 'react';

export const Input = ({ ...rest }) => {
  return (
    <input
      className="focus:none flex h-[50px] w-[100%] rounded-full pl-4 focus:outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      {...rest}
    />
  );
};
