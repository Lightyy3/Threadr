// import { createServer } from "node:http";
// import next from "next";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;

// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     handler(req, res);
//   });

//   server
//     .once("error", (err) => {
//       console.error("Server error:", err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });
