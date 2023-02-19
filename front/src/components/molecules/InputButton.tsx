import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { LabelInput } from '../atoms/LabelInput';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  submit(e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent): void;
  buttonLabel: string;
  inputLabel?: string;
}
export const InputButton = ({
  submit,
  inputLabel,
  buttonLabel,
  ...rest
}: Props) => {
  return (
    <div className="relative w-full">
      {inputLabel ? (
        <LabelInput label={inputLabel} {...rest} />
      ) : (
        <Input {...rest} />
      )}
      <div className=" absolute bottom-[5px] right-1">
        <Button label={buttonLabel} onClick={submit} />
      </div>
    </div>
  );
};
