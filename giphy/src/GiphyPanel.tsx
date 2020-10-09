import React, { useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, GiphyApiImageData, ImageData } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GiphyImageContainer } from 'GiphyImageContainer';

const API_KEY = 'F6mcCmi997bP1EiScOtUo1OvuP5qKEau';
interface Props extends PanelProps<SimpleOptions> {}

export const GiphyPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const inputEl = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Starting images as null to avoid a "no results found" in the very beginning
  const [images, setImages] = useState<ImageData[] | null>(null);
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
      setImages(null);
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
      <div className={cx(styles.inputWrapper)}>
        <input ref={inputEl} type="text" onChange={textChanged}></input>
        <button className={cx(styles.button)} disabled={buttonDisabled} onClick={search}>Search</button>
      </div>
      <div className={cx(styles.imagesContainer)}>
        <GiphyImageContainer images={images}/>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    button: css`
      color: black;
      &:disabled {
        color: gray;
        pointer-events:none;
      }
    `,
    inputWrapper: css`
      height: 25px;
      margin-bottom: 10px
    `,
    giphyContainer: css`
      overflow-y: scroll;
      max-height: calc(100% - 10px - 25px);
    `,
    imagesContainer: css`
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;
      max-height: calc(100% - 10px - 25px);
    `
  };
});
