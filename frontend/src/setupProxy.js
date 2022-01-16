const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth", {
      /* 개발 */
      // target: "http://localhost:5000",
      /* 배포 */
      target: "http://j3b305.p.ssafy.io:5000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "http://j3b305.p.ssafy.io:9999",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/custom", {
      target: "http://j3b305.p.ssafy.io:5500",
      changeOrigin: true,
    })
  );
};
