import cn from 'classnames';
import {InputHTMLAttributes, ReactNode, useState, forwardRef, ForwardedRef, useRef, useEffect} from 'react';

import {Icon} from 'shared/ui/icon';

import styles from './Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | boolean;
  onChange?: (v: string) => void;
  onInput?: (v: string) => void;
  slotBefore?: string | ReactNode;
  slotAfter?: string | ReactNode;
  onPasteButtonClick?: (clipboardValue: string) => void;
  onReset?: (e: any) => void;
};

export const Input = forwardRef(
  (
    {
      value,
      label,
      error,
      onChange,
      onInput,
      autoFocus = false,
      className,
      slotAfter,
      slotBefore,
      onPasteButtonClick,
      onReset,
      ...rest
    }: InputProps,
    ref?: ForwardedRef<HTMLLabelElement>,
  ) => {
    const inputRef = useRef(null);
    const pasteButtonRef = useRef<ReactNode | null>(null);
    const [focused, setFocused] = useState(autoFocus);

    useEffect(() => {
      if (typeof onPasteButtonClick === 'function') {
        const isPossibleToPaste = Boolean(window.navigator?.clipboard?.readText);

        if (isPossibleToPaste) {
          const handlePaste = async () => {
            const text = await window.navigator?.clipboard?.readText?.();

            if (text) {
              await onPasteButtonClick(text);
            }
          };

          pasteButtonRef.current = (
            <span className="font-size-12 is-link" onClick={handlePaste}>
              Paste
            </span>
          );
        }
      }
    }, [onPasteButtonClick]);

    return (
      <label className={cn(styles.Input, className)} ref={ref}>
        {label && <span className={styles.Input__label}>{label}</span>}

        <span className={cn(styles.Input__wrapper, focused && styles.Input_focused)}>
          {slotBefore && <span className={styles.Input__slotBefore}>{slotBefore}</span>}

          <input
            className={styles.Input__input}
            ref={inputRef}
            value={value}
            onBlur={() => setFocused(false)}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onInput={onInput}
            {...rest}
          />

          {slotAfter && <span className={styles.Input__slotAfter}>{slotAfter}</span>}
          {pasteButtonRef.current}
          {typeof onReset === 'function' && (
            <Icon className="cursor-pointer" color={value ? undefined : 'secondary2'} icon="x" onClick={onReset} />
          )}
        </span>

        {error && <span className={styles.Input__error}>{typeof error === 'string' ? error : 'Error'}</span>}
      </label>
    );
  },
);
