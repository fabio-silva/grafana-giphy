import React from 'react';
import { css } from 'emotion';
import { ImageProps } from './types';

export const GiphyImage: React.FC<ImageProps> = ({ url = '' }) => (
	<img
		className={css`
			object-fit: contain;
			height: 100%;
		`}
		src={`${url}`}
	>
	</img>
);