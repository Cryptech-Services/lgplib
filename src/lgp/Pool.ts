import ABI from '../abi';
import { MetrixContract, Provider, Transaction } from '@metrixcoin/metrilib';

export default class Pool extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.Pool);
  }

  /**
   * Add liquidity to the pool
   * @param amountGMRX the amount of gMRX to add
   * @param allowHighSlippage allow high slippage that can result in trading fees
   * @param amountMRX the amount of MRX to send with the transaction and add as MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async addLiquidity(
    amountGMRX: bigint,
    allowHighSlippage = false,
    amountMRX: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'addLiquidity(uint256,bool)',
      [`0x${amountGMRX.toString(16)}`, allowHighSlippage],
      amountMRX,
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Add liquidity to the pool
   * @param amountMRX the amount of wMRX to add as satoshi
   * @param amountGMRX the amount of gMRX to add as satoshi
   * @param allowHighSlippage allow high slippage that can result in trading fees
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async addWrappedLiquidity(
    amountMRX: bigint,
    amountGMRX: bigint,
    allowHighSlippage = false,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'addLiquidity(uint256,uint256,bool)',
      [
        `0x${amountMRX.toString(16)}`,
        `0x${amountGMRX.toString(16)}`,
        allowHighSlippage
      ],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Burn gMRX releasing wMRX or MRX
   * @param amountGMRX amount of gMRX to burn as satoshi
   * @param unwrapMRX unwrap the wMRX to MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burnAndRelease(
    amountGMRX: bigint,
    unwrapMRX = false,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'burnAndRelease(uint256,bool)',
      [`0x${amountGMRX.toString(16)}`, unwrapMRX],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Get the gMRX contract address
   * @returns {Promise<string>} the EVM style address of the gMRX contract
   */
  async gmrx(): Promise<string> {
    const t = await this.call(`gmrx()`, []);
    return t ? t.toString() : '';
  }

  /**
   * Get the LGP-LP contract address
   * @returns {Promise<string>} the EVM style address of the LGP-LP contract
   */
  async lp(): Promise<string> {
    const t = await this.call(`lp()`, []);
    return t ? t.toString() : '';
  }

  /**
   * Get the wMRX contract address
   * @returns {Promise<string>} the EVM style address of the wMRX contract
   */
  async mrx(): Promise<string> {
    const t = await this.call(`mrx()`, []);
    return t ? t.toString() : '';
  }

  /**
   * Get a quote based on the current reserves in the pool
   * @param from token to input
   * @param to token to output
   * @param amountIn input amount of tokens
   * @returns {Promise<bigint>} the price quote in satoshi
   */
  async quote(from: string, to: string, amountIn: bigint): Promise<bigint> {
    const q = await this.call(`quote(address,address,uint256)`, [
      from,
      to,
      `0x${amountIn.toString(16)}`
    ]);
    return !isNaN(Number(q ? q.toString() : undefined))
      ? BigInt(
          q!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Remove liquidity for the underlying wMRX/MRX and gMRX
   * @param amountLP amount of LP to remove
   * @param unwrapMRX unwrap the wMRX to MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async removeLiquidity(
    amountLP: bigint,
    unwrapMRX = false,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'removeLiquidity(uint256,bool)',
      [`0x${amountLP.toString(16)}`, unwrapMRX],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Get the current reserves in the pool
   * @returns {Promise<[mrxReserve: bigint, gmrxReserve: bigint]>} the reserves of the pool
   */
  async reserves(): Promise<[mrxReserve: bigint, gmrxReserve: bigint]> {
    const r = await this.call(`reserves()`, []);
    if (r && r.length >= 2) {
      const tup: [mrxReserve: bigint, gmrxReserve: bigint] = [
        BigInt(r[0].toString()),
        BigInt(r[1].toString())
      ];
      return tup;
    }
    return [BigInt(0), BigInt(0)];
  }

  /**
   * Swap MRX for gMRX, sending MRX and automatically wrapping it
   * @param slippage the allowed amount of slippage as basis points
   * @param amountMRX amount of MRX to send with the transaction
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async swapTokens(
    slippage: bigint,
    amountMRX: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'swapTokens(uint16)',
      [`0x${slippage.toString(16)}`],
      amountMRX,
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Swap between gMRX and wMRX
   * @param amount the amount of tokens to input
   * @param from the input token
   * @param to the output token
   * @param slippage the allowed amount of slippage as basis points
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async swapPairTokens(
    amount: bigint,
    from: string,
    to: string,
    slippage: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'swapTokens(uint256,address,address,uint16)',
      [`0x${amount.toString(16)}`, from, to, `0x${slippage.toString(16)}`],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
