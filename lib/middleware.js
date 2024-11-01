function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function parseJson(req, res, next) {
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }
      next();
    });
  } else {
    next();
  }
}

module.exports = { logger, parseJson };
