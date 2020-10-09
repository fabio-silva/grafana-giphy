import React, { useRef, useState } from 'react';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';

const styles = stylesFactory(() => ({
  button: css`
    color: black;
    &:disabled {
      color: gray;
      pointer-events:none;
    }
	`
}))();

interface SearchProps {
  onSearch: Function;
}

export const SearchInput: React.FC<SearchProps> = ({ onSearch }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const textChanged = () => {
    const searchValue = getSearchValue();
    const isButtonDisabled = !searchValue.length;

    if (isButtonDisabled !== buttonDisabled) {
      setButtonDisabled(isButtonDisabled);
    }
  }

  const getSearchValue = (): string => {
    let searchValue = '';

    if (inputEl && inputEl.current) {
      searchValue = inputEl.current.value;
    }

    return searchValue;
  }

  const search = () => {
    const searchValue = getSearchValue();

    if (searchValue) {
      onSearch(searchValue);
    }
  }
  
  return (
    <>
      <input ref={inputEl} type="text" onChange={textChanged}></input>
      <button className={cx(styles.button)} disabled={buttonDisabled} onClick={search}>Search</button>
    </>
  );
  };