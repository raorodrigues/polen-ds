import { defineCustomElements } from '../dist/esm/loader';
import "../dist/raor-polen-web-components/raor-polen-web-components.css";
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
