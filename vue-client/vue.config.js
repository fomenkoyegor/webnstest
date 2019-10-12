const path = require("path");
module.exports = {
    // outputDir: path.resolve(__dirname, "../public"),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://webnstest.test',
                ws: true,
                changeOrigin: true
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-client/dist/'
        : '/'
};
