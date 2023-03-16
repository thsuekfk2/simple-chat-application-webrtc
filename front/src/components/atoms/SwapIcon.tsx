interface Props {
  on: JSX.Element | string;
  off: JSX.Element | string;
  toggleClick?: () => void;
  swapOnClick?: () => void;
  swapOffClick?: () => void;
}

export const SwapIcon = ({
  on,
  off,
  toggleClick,
  swapOnClick,
  swapOffClick,
}: Props) => {
  return (
    <label className="swap swap-flip text-2xl mr-5 ">
      <input type="checkbox" onClick={toggleClick} />
      <div className="swap-off" onClick={swapOnClick}>
        {on}
      </div>
      <div className="swap-on" onClick={swapOffClick}>
        {off}
      </div>
    </label>
  );
};
