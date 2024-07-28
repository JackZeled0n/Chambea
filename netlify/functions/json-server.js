const { createServer, router, defaults } = require('json-server');
const server = createServer();
const middleware = defaults();
const jsonRouter = router('db.json');

server.use(middleware);
server.use(jsonRouter);

module.exports = server;
