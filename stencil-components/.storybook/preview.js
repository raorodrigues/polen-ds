import { defineCustomElements } from '../dist/esm/loader';
import "../dist/polen-web-components/polen-web-components.css";
defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
