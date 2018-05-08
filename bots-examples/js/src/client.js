const {
  privateToAddress,
  zeroAddress
} = require('ethereumjs-util');

const SolidityFunction = require('web3/lib/web3/function');
const { createSignature } = require('@token.store/ethjs-order-signer');
const { toHex } = require('web3').prototype;
const Tx = require('ethereumjs-tx');
const got = require('got');
const { HTTPError } = require('got/errors');
const BigNumber = require('bignumber.js');
BigNumber.config({ EXPONENTIAL_AT: 100 });

const API = 'https://v1.api.token.store';

class Client {
  constructor (secret) {
    this._dateCreators = {};

    this.private = Buffer.from(secret, 'hex');
    this.address = `0x${privateToAddress(this.private).toString('hex')}`;

    this.contractAddress = undefined;

    this.nonce = undefined;
    this.gasPrice = undefined;
    this.gasLimit = undefined;
    this.blockNumber = undefined;
  }

  /**
   * Set fee info, contractAddress and parse abi
   * @returns {Promise<void>}
   */
  async init () {
    const url = `${API}/contract`;
    const data = await this._call(url);

    this.contractAddress = data.contract.address;

    data.contract.abi
      .filter(abi => abi.type === 'function')
      .forEach(abi => {
        const solidityFunc = new SolidityFunction('', abi, '');
        this._dateCreators[abi.name] = (data) => {
          const params = [];
          for (const input of abi.inputs) {
            const param = data[input.name];
            params.push(param);
          }
          return solidityFunc.toPayload(params).data;
        };
      });
  }

  /**
   * Set nonce and gas data. Recommended to run before transaction
   * @returns {Promise<void>}
   */
  async sync () {
    const url = `${API}/config`;
    const data = await this._call(url);

    this.gasPrice = data.recommendedGasPrice;
    this.gasLimit = data.recommendedGasLimit;
    this.blockNumber = data.blockNumber;

    const personalUrl = `${API}/accounts/${this.address}`;
    const { nonce } = await this._call(personalUrl);
    this.nonce = nonce;
  }

  /**
   * Withdraw etherium.
   * @param {string} amount - etherium in wei.
   * @returns {Promise<*>}
   */
  async withdrawEth (amount) {
    const url = `${API}/accounts/${this.address}/withdraw`;
    const data = this._dateCreators['withdraw']({
      _amount: amount
    });

    const payload = this._createBasePayload(data);
    payload.tokenAddress = zeroAddress();
    payload.amount = amount;
    return this._call(url, payload);
  }

  /**
   * Withdraw token
   * @param {string} _token - token address
   * @param {string} _amount - in uint256
   * @returns {Promise<*>}
   */
  async withdrawToken (_token, _amount) {
    const url = `${API}/accounts/${this.address}/withdraw`;
    const data = this._dateCreators['withdrawToken']({
      _amount,
      _token
    });

    const payload = this._createBasePayload(data);
    payload.tokenAddress = _token;
    payload.amount = _amount;
    return this._call(url, payload);
  }

  /**
   * Deposit etherium
   * @param {string} amount - etherium in wei.
   * @returns {Promise<*>}
   */
  async depositEth (amount) {
    const url = `${API}/accounts/${this.address}/deposit`;
    const data = this._dateCreators['deposit']({});

    const payload = this._createBasePayload(data, amount);
    payload.tokenAddress = zeroAddress();
    payload.amount = amount;
    return this._call(url, payload);
  }

  /**
   * Deposit token
   * @param {string} _token - token address
   * @param {string} amount - in uint256
   * @returns {Promise<*>}
   */
  async depositToken (_token, _amount) {
    const url = `${API}/accounts/${this.address}/deposit`;
    const data = this._dateCreators['depositToken']({
      _token,
      _amount
    });

    const payload = this._createBasePayload(data);
    payload.tokenAddress = _token;
    payload.amount = _amount;
    return this._call(url, payload);
  }

  /**
   * @param {string} tokenAddress
   * @param {number} tokenDecimals
   * @param {number} price - etherium per token
   * @param {number} amount - token amount
   * @param {number} expiresIn - after what block the order will not be valid anymore
   * @returns {Promise<OrderObject>}
   */
  async placeBuyOrder (tokenAddress, tokenDecimals, price, amount, expiresIn = 10000) {
    const url = `${API}/orders`;
    const payload = this._createOrder('buy', tokenAddress, tokenDecimals, price, amount, this.blockNumber + expiresIn);

    return this._call(url, payload, 'POST');
  }

  /**
   * @param {string} tokenAddress
   * @param {number} tokenDecimals
   * @param {number} price - etherium per token
   * @param {number} amount - token amount
   * @param {number} expiresIn - after what block the order will not be valid anymore
   * @returns {Promise<OrderObject>}
   */
  async placeSellOrder (tokenAddress, tokenDecimals, price, amount, expiresIn = 10000) {
    const url = `${API}/orders`;
    const payload = this._createOrder('sell', tokenAddress, tokenDecimals, price, amount, this.blockNumber + expiresIn);

    return this._call(url, payload, 'POST');
  }

  /**
   * @param {number} orderId - in /orders/ endpoint
   * @returns {Promise<void>}
   */
  async cancelOrder (orderId) {
    const orderUrl = `${API}/orders/${orderId}`;
    const order = await this._call(orderUrl);

    const data = this._dateCreators['cancelOrder']({
      _tokenGet: order.tokenGet,
      _amountGet: order.amountGet,
      _tokenGive: order.tokenGive,
      _amountGive: order.amountGive,
      _expires: order.expires,
      _nonce: order.nonce,
      _v: order.signature.v,
      _r: order.signature.r,
      _s: order.signature.s
    });

    const payload = this._createBasePayload(data);
    return this._call(`${orderUrl}/cancel`, payload);
  }

  /**
   * @param {number} orderId - in /orders/ endpoint
   * @param {number} amount - token amount
   * @returns {Promise<void>}
   */
  async trade (orderId, amount) {
    const tradesUrl = `${API}/trades`;
    const orderUrl = `${API}/orders/${orderId}`;
    const order = await this._call(orderUrl);

    const data = this._dateCreators['trade']({
      _tokenGet: order.tokenGet,
      _amountGet: order.amountGet,
      _tokenGive: order.tokenGive,
      _amountGive: order.amountGive,
      _expires: order.expires,
      _nonce: order.nonce,
      _v: order.signature.v,
      _r: order.signature.r,
      _s: order.signature.s,
      _amount: amount
    });

    const payload = this._createBasePayload(data);
    payload.orderId = orderId;
    payload.account = this.address;
    payload.amount = amount;

    return this._call(tradesUrl, payload);
  }

  /**
   * @param {string} url
   * @param body
   * @private
   */
  async _call (url, body = undefined) {
    try {
      const response = await got(url, {
        json: true,
        method: body ? 'POST' : 'GET',
        body,
        headers: {
          'user-agent': 'ts-bot v1.0.0'
        }
      });
      return response.body;
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error);
        throw new Error(error.response.body.message);
      } else {
        throw error;
      }
    }
  }

  /**
   * @param {string} data
   * @param {number|string} value
   * @returns {{tx: {nonce: number, gasPrice: number, gasLimit: number}, signature: {v: number, r: string, s: string}}}
   * @private
   */
  _createBasePayload (data, value = 0) {
    const tx = new Tx({
      nonce: this.nonce,
      gasPrice: this.gasPrice,
      gasLimit: this.gasLimit,
      to: this.contractAddress,
      value: value && toHex(value),
      data
    });

    tx.sign(this.private);

    return {
      tx: {
        nonce: this.nonce,
        gasPrice: this.gasPrice,
        gasLimit: this.gasLimit
      },
      signature: {
        r: tx.r.toString('hex'),
        s: tx.s.toString('hex'),
        v: parseInt(tx.v.toString('hex'), 16)
      }
    };
  }

  _toWei (eth, decimals) {
    return (new BigNumber(String(eth))).times(new BigNumber(10 ** decimals)).floor();
  }

  /**
   * @typedef {Object} OrderObjectSignature
   * @property {number} v
   * @property {string} r
   * @property {string} s
   */

  /**
   * @typedef {Object} OrderObject
   * @property {string} account
   * @property {string} contract
   * @property {string} tokenGet
   * @property {string} amountGet
   * @property {string} tokenGive
   * @property {string} amountGive
   * @property {number} nonce
   * @property {number} expires
   * @property {OrderObjectSignature} signature
   */

  /**
   * @private
   * @param {string} side - buy/sell
   * @param {string} tokenAddress
   * @param {string} tokenDecimals
   * @param {number} price
   * @param {number} amount
   * @param {number} expires
   * @returns OrderObject
   * @see https://github.com/etherdelta/bots/blob/master/js/service.js
   */
  _createOrder (side, tokenAddress, tokenDecimals, price, amount, expires) {
    if (side !== 'buy' && side !== 'sell') throw new Error('Side must be buy or sell');

    const amountBigNum = new BigNumber(String(amount));
    const amountBaseBigNum = new BigNumber(String(amount * price));
    const amountGet = side === 'buy'
      ? this._toWei(amountBigNum, tokenDecimals)
      : this._toWei(amountBaseBigNum, 18);
    const amountGive = side === 'sell'
      ? this._toWei(amountBigNum, tokenDecimals)
      : this._toWei(amountBaseBigNum, 18);

    const orderNonce = Number(Math.random().toString().slice(2));

    const order = {
      account: this.address,
      contract: this.contractAddress,
      tokenGet: side === 'buy' ? tokenAddress : zeroAddress(),
      amountGet: amountGet.toString(),
      tokenGive: side === 'sell' ? tokenAddress : zeroAddress(),
      amountGive: amountGive.toString(),
      nonce: orderNonce,
      expires
    };

    order.signature = createSignature(order, this.private);

    return order;
  }
}

module.exports = Client;
