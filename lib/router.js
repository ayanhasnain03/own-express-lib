class Router {
  constructor() {
    this.routes = {};
  }

  addRoute(method, path, handler) {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }

  handle(req, res, context) {
    const { method, url } = req;
    const routeHandler = this.routes[method] ? this.routes[method][url] : null;

    if (routeHandler) {
      routeHandler(context.req, context.res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
}

module.exports = Router;
