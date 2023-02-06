import React from 'react';

interface Props {
  icon: string;
}

export const BounceIcon = ({ icon }: Props) => {
  return (
    <div className="relative left-[97%] top-1/2 w-[50px] animate-bounce text-5xl">
      {icon}
    </div>
  );
};
