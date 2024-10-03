const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Path to your JSON file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Start the server on the port assigned by Vercel
server.listen(3000, () => {
  console.log("JSON Server is running");
});