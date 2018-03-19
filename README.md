# apidocs
REST API docs for https://token.store

### `https://token.store/api/ticker`
Returns 24h trade volume and the last price for each coin.

Sample output:
```
{
  "ETH_TTT":{
    "tokenAddr":"0xf3bc4a5abbb9ffa56c84d27f167e7257c64bd0b2",
    "quoteVolume":18,
    "baseVolume":6.050000000000001,
    "last":0.15,
    "bid":0.3,
    "ask":0.15,
    "percentChange":-90.54688681639148
  }
}
```