import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addNumberInput({
      path: 'nrImages',
      name: 'Number of images',
      description: 'Number of images to show',
      defaultValue: 10
    })
});
