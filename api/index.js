import { createServer, Model } from 'json-server';

const server = createServer();
const router = server.use(
  Model.extend({
    playlist: [],
  })
);

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});