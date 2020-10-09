import React from 'react';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';
import { GiphyImage } from 'GiphyImage';
import { ImageData } from 'types';

const styles = stylesFactory(() => ({
  giphyImg: css`
    height: 150px;
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: 10px;
    }
	`
}))();

interface ImageProps {
  images: ImageData[] | null
};

export const GiphyImageContainer: React.FC<ImageProps> = ({ images }) => {
  let imageEl: JSX.Element[] | JSX.Element = <></>;
  // At this point, we can check if we should show a "no results found"
  if (images) {
    if (images.length) {
      imageEl = images.map(({ id, url }) => <div
        className={cx(styles.giphyImg)}
        key={id}
      >
        <GiphyImage url={url} />
      </div>
      )
    } else {
      imageEl = <p>No result found</p>;
    }
  }

  return <>{imageEl}</>;
}