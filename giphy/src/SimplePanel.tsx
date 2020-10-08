import React, { useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  const inputEl = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { nrImages } = options;
  let searchValue = '';

  const search = async () => {
    console.log(searchValue);
    console.log(nrImages);
    // const apiResp = await fetch()
  }

  const textChanged = () => {
    if (inputEl && inputEl.current) {
      searchValue = inputEl.current.value;
    }
    const isButtonDisabled = !searchValue.length;

    if (isButtonDisabled !== buttonDisabled) {
      setButtonDisabled(isButtonDisabled);
    }
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <input ref={inputEl} type="text" onChange={textChanged}></input>
      <button disabled={buttonDisabled} onClick={search}>Search</button>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
