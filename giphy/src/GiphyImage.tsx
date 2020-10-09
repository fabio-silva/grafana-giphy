import React from 'react';
import { css } from 'emotion';
import { ImageProps } from './types';

export const GiphyImage: React.FC<ImageProps> = ({ url = '' }) => (
  /**
   * Even though the Giphy API will return same-height images, using object-fit
   * can avoid different heights in the future.
   */
  <img
      className={css`
          object-fit: contain;
          height: 100%;
      `}
      src={`${url}`}
  >
  </img>
);