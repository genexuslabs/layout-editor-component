import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "gx-layout-editor",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: null,
      copy: [{ src: "assets" }]
    }
  ],
  globalStyle: "src/globals/global.scss",
  plugins: [sass()]
};
