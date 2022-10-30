import {useState} from 'react';

import {Icon} from '../icon';

import {Input, InputProps} from './Input';

export const InputPassword = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      slotAfter={<Icon icon={isVisible ? 'eye' : 'eye-cross'} onClick={() => setIsVisible(!isVisible)} />}
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
  );
};
