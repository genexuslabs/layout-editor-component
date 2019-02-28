const { sass } = require("@stencil/sass");

exports.config = {
  namespace: "gx-layout-editor",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: false
    }
  ],
  plugins: [sass()]
};
