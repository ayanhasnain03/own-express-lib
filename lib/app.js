const http = require("http");
const Router = require("./router");

class App {
  constructor() {
    this.router = new Router();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handleRequest(req, res) {
    const context = { req, res };

    let mwIndex = 0;

    const executeMiddleware = () => {
      if (mwIndex < this.middlewares.length) {
        const mw = this.middlewares[mwIndex++];
        mw(context.req, context.res, executeMiddleware);
      } else {
        this.router.handle(req, res, context);
      }
    };

    executeMiddleware();
  }

  listen(port, callback) {
    const server = http.createServer((req, res) =>
      this.handleRequest(req, res)
    );
    server.listen(port, callback);
  }

  get(path, handler) {
    this.router.addRoute("GET", path, handler);
  }

  post(path, handler) {
    this.router.addRoute("POST", path, handler);
  }
}

module.exports = App;
