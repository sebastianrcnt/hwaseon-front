const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        // lessOptions: {
        // If you are using less-loader@5 please spread the lessOptions to options directly
        modifyVars: {
          "primary-color": "#FF6633",
          "link-color": "#FF6633",
          "border-radius-base": "2px",
        },
        javascriptEnabled: true,
        // },
      },
    },
  },
};
