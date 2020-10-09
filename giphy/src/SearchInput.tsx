import React, { useRef, useState } from 'react';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';

const styles = stylesFactory(() => ({
  button: css`
    color: black;
    &:disabled {
      color: gray;
      pointer-events: none;
    }
  `,
}))();

interface SearchProps {
  onSearch: Function;
}

export const SearchInput: React.FC<SearchProps> = ({ onSearch }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [searchValue, setValue] = useState('');

  const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);
    const isButtonDisabled = !value.length;

    if (isButtonDisabled !== buttonDisabled) {
      setButtonDisabled(isButtonDisabled);
    }
  };

  const search = () => {
    if (searchValue) {
      onSearch(searchValue);
    }
  };

  return (
    <>
      <input ref={inputEl} type="text" value={searchValue} onChange={textChanged}></input>
      <button className={cx(styles.button)} disabled={buttonDisabled} onClick={search}>
        Search
      </button>
    </>
  );
};
