import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  submit(): void;
  label: string;
}
export const InputButton = ({ submit, label, ...rest }: Props) => {
  return (
    <div className="relative">
      <div className="">
        <Input {...rest} />
      </div>

      <div className=" absolute bottom-[5px] right-1">
        <Button label={label} onClick={submit} />
      </div>
    </div>
  );
};
