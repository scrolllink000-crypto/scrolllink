// --- server.js ---
import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';

const bare = createBareServer('/bare/');

const server = createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
    return;
  }
  res.writeHead(200);
  res.end('ok');
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
    return;
  }
  socket.end();
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`bare server on ${port}`));
