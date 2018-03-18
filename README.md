# apidocs
REST API docs for https://api.token.store

### `/ticker`
Returns 24h trade volume and the last price for each coin.

#### Sample output:
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

### `/public/trades`
Historical trades
Return historical trades executed. Trades returned in ascending order. Option available to query historical trades based on tradeID, default is
to return latest 100 trades

#### Params

|Name        | Type         | Example                                             | Description
|------------|--------------|-----------------------------------------------------|----------------------------
|pair        | String       | ETH-EOS                                             | 
|fromId      | String       | 2bd18edc-eab4-4b4c-98e5-33c41d0a9c35                | query by tradeID, display trades after this ID inclusive (optional, default to return latest trades)
|limit       | Integer      | 200                                                 | number of trades returned (optional, default to 100)

#### Sample input: 

`GET /public/trades?pair=ETH-EOS&limit=20&fromId=688baf8d-463a-4543-b7ee-22d2ff3d411f` 

#### Sample output:
```
[
   {
      "id":"1dc5b179-2f13-4432-aa9c-89bc8bfba3b8",
      "timestamp":1520797156,
      "createdAt":"2018-03-11T19:39:16.967Z",
      "amount":0.01,
      "price":2,
      "type":"sell",
      "tokenGet":"ETH",
      "tokenGive":"EOS"
   },
   {
      "id":"7e08453e-cf62-4e1f-8aa5-a2e2643fa41a",
      "timestamp":1520797166,
      "createdAt":"2018-03-11T19:39:26.011Z",
      "amount":0.01,
      "price":2,
      "type":"sell",
      "tokenGet":{"symbol": "ETH"},
      "tokenGive":{"symbol": "EOS"}
   }
]
```

### `/public/products`

Get list of products

#### Sample output

```
[  
   {  
      "id":"ETH-EGR",
      "fromSymbol":"ETH",
      "toSymbol":"EGR"
   },
   {  
      "id":"ETH-BAS",
      "fromSymbol":"ETH",
      "toSymbol":"BAS"
   }
]
```

### `/public/orderbook/:pair`

Orderbook for a pair

#### Sample input:

`GET /public/orderbook/ETH-TT1?limit=1`

#### Sample output:

```
[  
   [  
      {  
         "id":"3a33137e-58d9-471e-8a68-b6dc1597e906",
         "account":"0x2a51f02e6b6eca2c8cd04b092eb42cfcf61619e0",
         "contract":"0x84a2b43ba06b0e6fa10088fe22ca48e72b264048",
         "expires":113558,
         "nonce":2537659210,
         "availableVolume":100000,
         "amountGet":100000,
         "amountGive":100000000000000000000,
         "createdAt":"2018-03-14T18:42:07.060Z",
         "tokenGet":{  
            "symbol":"EOS",
            "decimals":3
         },
         "tokenGive":{  
            "symbol":"ETH",
            "decimals":18
         }
      }
   ]
]
```