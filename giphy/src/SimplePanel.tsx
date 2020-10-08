import React, { useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, GiphyApiImageData } from 'types';
import { GiphyImage } from 'GiphyImage';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';

const API_KEY = 'F6mcCmi997bP1EiScOtUo1OvuP5qKEau';
interface Props extends PanelProps<SimpleOptions> {}
interface ImageData {
  url: string;
  id: string;
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const inputEl = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [images, setImages] = useState<ImageData[]>([]);
  const { nrImages } = options;

  const getSearchValue = (): string => {
    let searchValue = '';

    if (inputEl && inputEl.current) {
      searchValue = inputEl.current.value;
    }

    return searchValue;
  }

  const search = async () => {
    const searchValue = getSearchValue();
    try {
      const apiResp = await fetch(
        `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchValue}&limit=${nrImages}`
        );
      const apiData: GiphyApiImageData = await apiResp.json();
      const stateData = apiData.data.map(d => ({ id: d.id, url: d.images.fixed_height_small.url }))
      setImages(stateData);
    } catch (e) {

    }
  }

  const textChanged = () => {
    const searchValue = getSearchValue();
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

      <div className={css`
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
      `}>
        {
          images.map(({ id, url }) => <div className={cx(styles.giphyImg)} key={id} style={{height: "150px"}}><GiphyImage url={url} /></div>)
        }
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
    giphyImg: css`
      margin-bottom: 10px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    `
  };
});
