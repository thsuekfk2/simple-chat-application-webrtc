import React from 'react';
interface Props {
  on: string;
  off: string;
}

export const SwapIcon = ({ on, off }: Props) => {
  return (
    <label className="swap swap-flip text-2xl mr-5">
      <input type="checkbox" />
      <div className="swap-on">{on}</div>
      <div className="swap-off">{off}</div>
    </label>
  );
};
