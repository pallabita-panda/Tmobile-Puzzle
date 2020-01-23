/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { stockplugin } from './app/plugin/stock-plugin'
import CatboxMemory from '@hapi/catbox-memory';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    cache: [{
      name: 'stock_cache',
      provider: {
        constructor: CatboxMemory,
        options: {
          partition: 'stock_cached_data',
          host: 'localhost',
          port: 3333,
          database: 0,
        }
      }
    }]
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  await server.register({
    plugin: stockplugin,
    options: {
      cache: 'stock_cache'
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
