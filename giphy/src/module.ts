import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { GiphyPanel } from './GiphyPanel';

export const plugin = new PanelPlugin<SimpleOptions>(GiphyPanel).setPanelOptions(builder => {
  return builder
    .addNumberInput({
      path: 'nrImages',
      name: 'Number of images',
      description: 'Number of images to show',
      defaultValue: 10
    })
});
