import React from 'react';

interface Props {
  icon: string;
}

export const BounceIcon = ({ icon }: Props) => {
  return (
    // absolute left-[97%] top-1/2 w-[50px] animate-bounce text-5xl
    <div className="absolute  animate-bounce ">{icon}</div>
  );
};
