import React from 'react';

export const Input = ({ ...rest }) => {
  return (
    <input
      className="focus:none flex h-[50px] w-[300px] rounded-full pl-4 focus:outline-none"
      {...rest}
    />
  );
};
