type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  nrImages: number;
}

export interface ImageProps {
  url: string;
}

interface GiphyImg {
  url: string;
  width: number;
  height: number;
}

/**
 * Just adding these properties for now
 */
export interface GiphyApiImageData {
  data: {
    id: string;
    images: {
      original: GiphyImg;
      fixed_height_small: GiphyImg;
    }
  }[]
}

export interface ImageData {
  url: string;
  id: string;
}
