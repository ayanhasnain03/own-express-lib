const App = require("./lib/app");
const { logger, parseJson } = require("./lib/middleware");

const app = new App();

app.use(logger);
app.use(parseJson);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome to my Express-like library!");
});

app.post("/data", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ received: req.body }));
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
