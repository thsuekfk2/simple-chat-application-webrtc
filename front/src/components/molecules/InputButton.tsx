import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  submit(e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent): void;
  label: string;
}
export const InputButton = ({ submit, label, ...rest }: Props) => {
  return (
    <div className="relative w-full">
      <div>
        <Input {...rest} />
      </div>

      <div className=" absolute bottom-[5px] right-1">
        <Button label={label} onClick={submit} />
      </div>
    </div>
  );
};
