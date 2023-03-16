interface Props {
  icon: string;
}

export const BounceIcon = ({ icon }: Props) => {
  return <div className="ml-3 animate-bounce z-[2]">{icon}</div>;
};
