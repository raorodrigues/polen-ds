import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'polen-web-components',
  globalStyle: 'src/scss/style.scss',
  plugins: [sass()],
  buildEs5: 'prod',
  outputTargets: [
    react({
      componentCorePackage: 'polen-web-components',
      proxiesFile: '../react-components/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ]
};
