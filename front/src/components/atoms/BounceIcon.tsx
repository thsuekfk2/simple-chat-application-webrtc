import React from 'react';

interface Props {
  icon: string;
}

export const BounceIcon = ({ icon }: Props) => {
  return <div className="absolute hover:animate-bounce z-[2]">{icon}</div>;
};
