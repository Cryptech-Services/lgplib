import ABI from '../abi';
import {
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';
import { CONTRACTS } from '../constants';
import { ZeroAddress, ZeroHash } from 'ethers';

export default class Pool extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.Pool);
  }

  /**
   * Add liquidity to the pool
   * @param amountGMRX the amount of gMRX to add
   * @param minimum the minimum amount of LP tokens to receive as wei
   * @param allowHighSlippage allow high slippage that can result in trading fees
   * @param amountMRX the amount of MRX to send with the transaction and add as MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async addLiquidity(
    amountGMRX: bigint,
    minimum: bigint,
    allowHighSlippage = false,
    amountMRX: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'addLiquidity(uint256,uint256,bool)',
        [
          `0x${amountGMRX.toString(16)}`,
          `0x${minimum.toString(16)}`,
          allowHighSlippage
        ],
        amountMRX,
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Add liquidity to the pool
   * @param amountMRX the amount of wMRX to add as satoshi
   * @param amountGMRX the amount of gMRX to add as satoshi
   * @param minimum the minimum amount of LP tokens to receive as wei
   * @param allowHighSlippage allow high slippage that can result in trading fees
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async addWrappedLiquidity(
    amountMRX: bigint,
    amountGMRX: bigint,
    minimum: bigint,
    allowHighSlippage = false,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'addLiquidity(uint256,uint256,uint256,bool)',
        [
          `0x${amountMRX.toString(16)}`,
          `0x${amountGMRX.toString(16)}`,
          `0x${minimum.toString(16)}`,
          allowHighSlippage
        ],
        '0',
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Burn gMRX releasing wMRX or MRX
   * @param amountGMRX amount of gMRX to burn as satoshi
   * @param minimum the minimum amount of MRX or wMRX to receive as satoshi
   * @param unwrapMRX unwrap the wMRX to MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burnAndRelease(
    amountGMRX: bigint,
    minimum: bigint,
    unwrapMRX = false,
    gasLimit: number | undefined = unwrapMRX ? 124929 : 108007
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'burnAndRelease(uint256,uint256,bool)',
        [
          `0x${amountGMRX.toString(16)}`,
          `0x${minimum.toString(16)}`,
          unwrapMRX
        ],
        '0',
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Get the g contract address
   * @returns {Promise<string>} the EVM style address of the g contract
   */
  async g(): Promise<string> {
    const t = await this.call(`g()`, []);
    return t ? t.toString() : ZeroAddress;
  }

  /**
   * Get the gMRX contract address
   * @returns {Promise<string>} the EVM style address of the gMRX contract
   */
  async gmrx(): Promise<string> {
    const t = await this.call(`gmrx()`, []);
    return t ? t.toString() : ZeroAddress;
  }

  /**
   * Get the block number of cooldown for a specific address
   * @param locker the EVM style address of the locker
   * @returns {Promise<bigint>} the block number which cooldown ends
   */
  async lockCooldown(locker: string): Promise<bigint> {
    const cooldown = await this.call(`lockCooldown(address)`, [locker]);
    return !isNaN(Number(cooldown ? cooldown.toString() : undefined))
      ? BigInt(
          cooldown!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Lock liquidity in the pool
   * @param amountLP the amount of LGP-LP to add
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async lockLP(
    amountLP: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'lockLP(uint256)',
        [`0x${amountLP.toString(16)}`],
        '0',
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Get the amount of LGP-LP locked by a specific address
   * @param locker the EVM style address of the locker
   * @returns {Promise<bigint>} the amount of LGP-LP locked as wei
   */
  async lockedLP(locker: string): Promise<bigint> {
    const cooldown = await this.call(`lockedLP(address)`, [locker]);
    return !isNaN(Number(cooldown ? cooldown.toString() : undefined))
      ? BigInt(
          cooldown!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Get the LGP-LP contract address
   * @returns {Promise<string>} the EVM style address of the LGP-LP contract
   */
  async lp(): Promise<string> {
    const t = await this.call(`lp()`, []);
    return t ? t.toString() : ZeroAddress;
  }

  /**
   * Get a quote for LP based on the current reserves in the pool
   * @param amountMRX amount of MRX to add as satoshi
   * @param amountGMRX amount of gMRX to add as satoshi
   * @returns {Promise<bigint>} the amount of LGP-LP to receive as wei
   */
  async lpAddQuote(amountMRX: bigint, amountGMRX: bigint): Promise<bigint> {
    const q = await this.call(`lpAddQuote(uint256,uint256)`, [
      `0x${amountMRX.toString(16)}`,
      `0x${amountGMRX.toString(16)}`
    ]);
    return !isNaN(Number(q ? q.toString() : undefined))
      ? BigInt(
          q!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Get a redemption quote based on the current reserves in the pool
   * @param amountLP amount of LGP-LP to add as wei
   * @returns {Promise<[amountMRX: bigint, amountGMRX: bigint]>} the amount of MRX and gMRX received as satoshi
   */
  async lpRemoveQuote(
    amountLP: bigint
  ): Promise<[amountMRX: bigint, amountGMRX: bigint]> {
    const q = await this.call(`lpRemoveQuote(uint256)`, [
      `0x${amountLP.toString(16)}`
    ]);
    if (q && q.length >= 2) {
      const tup: [amountMRX: bigint, amountGMRX: bigint] = [
        BigInt(q[0].toString()),
        BigInt(q[1].toString())
      ];
      return tup;
    }
    return [BigInt(0), BigInt(0)];
  }

  /**
   * Get the wMRX contract address
   * @returns {Promise<string>} the EVM style address of the wMRX contract
   */
  async mrx(): Promise<string> {
    const t = await this.call(`mrx()`, []);
    return t ? t.toString() : ZeroAddress;
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
    try {
      const tx = await this.send(
        'removeLiquidity(uint256,bool)',
        [`0x${amountLP.toString(16)}`, unwrapMRX],
        '0',
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
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
   * Get a swap quote based on the current reserves in the pool
   * @param from token to input
   * @param to token to output
   * @param amountIn input amount of tokens
   * @returns {Promise<[amountOut: bigint, slippage: bigint]>} the price quote in satoshi and the slippage as basis points
   */
  async swapQuote(
    from: string,
    to: string,
    amountIn: bigint
  ): Promise<[amountOut: bigint, slippage: bigint]> {
    const q = await this.call(`swapQuote(address,address,uint256)`, [
      from,
      to,
      `0x${amountIn.toString(16)}`
    ]);
    if (q && q.length >= 2) {
      const tup: [amountOut: bigint, slippage: bigint] = [
        BigInt(q[0].toString()),
        BigInt(q[1].toString())
      ];
      return tup;
    }
    return [BigInt(0), BigInt(0)];
  }

  /**
   * Swap MRX for gMRX, sending MRX and automatically wrapping it
   * @param slippage the allowed amount of slippage as basis points
   * @param minimum the minimum amount of gMRX tokens to receive as satoshi
   * @param amountMRX amount of MRX to send with the transaction
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async swapTokens(
    minimum: bigint,
    slippage: bigint,
    amountMRX: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'swapTokens(uint256,uint16)',
        [`0x${minimum.toString(16)}`, `0x${slippage.toString(16)}`],
        amountMRX,
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Swap between gMRX and wMRX
   * @param amount the amount of tokens to input as satoshi
   * @param from the input token
   * @param to the output token
   * @param minimum the minimum amount of tokens to receive as satoshi
   * @param slippage the allowed amount of slippage as basis points
   * @param unwrapMRX unwrap the wMRX to MRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async swapPairTokens(
    amount: bigint,
    from: string,
    to: string,
    minimum: bigint,
    slippage: bigint,
    unwrapMRX: boolean,
    gasLimit: number | undefined = unwrapMRX ? 101933 : 85316
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'swapTokens(uint256,address,address,uint256,uint16,bool)',
        [
          `0x${amount.toString(16)}`,
          from,
          to,
          `0x${minimum.toString(16)}`,
          `0x${slippage.toString(16)}`,
          unwrapMRX
        ],
        '0',
        gasLimit,
        unwrapMRX &&
          to.toLowerCase().replace('0x', '') ===
            CONTRACTS[this.provider.network].WrappedMetrix
          ? 5000
          : 5015
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Get the total amount of LGP-LP locked in the pool
   * @returns {Promise<bigint>} the amount of LGP-LP locked as wei
   */
  async totalLockedLP(): Promise<bigint> {
    const locked = await this.call(`totalLockedLP()`, []);
    return !isNaN(Number(locked ? locked.toString() : undefined))
      ? BigInt(
          locked!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Check if a specific trader has swap fee waiver
   * @param trader the EVM style address of the trader to check
   * @returns {Promise<boolean>} if the trader a discount
   */
  async traderDiscount(trader: string): Promise<boolean> {
    const hasDiscount = await this.call(`traderDiscount(address)`, [trader]);
    return hasDiscount ? hasDiscount.toString() === 'true' : false;
  }

  /**
   * Unlock liquidity in the pool
   * @param amountLP the amount of LGP-LP to remove
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async unlockLP(
    amountLP: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'unlockLP(uint256)',
        [`0x${amountLP.toString(16)}`],
        '0',
        gasLimit,
        5000
      );
      const getReceipts = this.provider.getTxReceipts(
        tx,
        this.abi,
        this.address
      );
      return {
        txid: tx.txid,
        getReceipts
      };
    } catch (e) {
      const getReceipts = async () => {
        return [] as TransactionReceipt[];
      };
      return {
        txid: ZeroHash.replace('0x', ''),
        getReceipts: getReceipts(),
        error: {
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }
}
