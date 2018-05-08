const Client = require('./client');

const privateKey = 'd38127980869e585639efc7b8d9a30643b486ba62d265fbf8809de9f4fc42c6b';

const client = new Client(privateKey);

async function start () {
  await client.init();
  await client.sync();
  await client.placeBuyOrder('0xd780ae2bf04cd96e577d3d014762f831d97129d0', 18, 0.0005, 1000);
  await client.cancelOrder(109231);
  await client.depositToken('0xabfef126779e80b2f271f12cdd142f2ace540ccf', 10000 * 10 ** 18);
  await client.depositEth(0.1 * 10 ** 18);
  await client.withdrawEth(0.01 * 10 ** 18);
  await client.withdrawToken('0xabfef126779e80b2f271f12cdd142f2ace540ccf', 1000 * 10 ** 18);
  await client.trade(109231, 0.0001 * 10 ** 18);
}

start()
  .then(() => {
    console.log('Done');
  })
  .catch((error) => {
    console.error(error);
  });
