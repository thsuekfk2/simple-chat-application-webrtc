import React from 'react';

interface Props {
  icon: string;
}

export const BounceIcon = ({ icon }: Props) => {
  return <div className="absolute  animate-bounce ">{icon}</div>;
};
