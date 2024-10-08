import { ZeroHash } from 'ethers';
import ABI from '../abi';
import {
  IERC20Metadata,
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';

export default class WrappedMetrix
  extends MetrixContract
  implements IERC20Metadata
{
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.WrappedMetrix);
  }
  async name(): Promise<string> {
    const n = await this.call(`name()`, []);
    return n ? n.toString() : '';
  }

  async symbol(): Promise<string> {
    const sym = await this.call(`symbol()`, []);
    return sym ? sym.toString() : '';
  }

  async decimals(): Promise<number> {
    const dec = await this.call(`decimals()`, []);
    return !isNaN(Number(dec ? dec.toString() : undefined))
      ? Number(dec!)
      : Number(0);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    const allowance = await this.call(`allowance(address,address)`, [
      owner,
      spender
    ]);
    return !isNaN(Number(allowance ? allowance.toString() : undefined))
      ? BigInt(allowance!.toString())
      : BigInt(0);
  }

  async approve(
    spender: string,
    amount: bigint,
    gasLimit: number | undefined = 48690
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'approve(address,uint256)',
        [spender, `0x${amount.toString(16)}`],
        '0',
        gasLimit,
        6150
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(balance!.toString())
      : BigInt(0);
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(total!.toString())
      : BigInt(0);
  }

  async transfer(
    recipient: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'transfer(address,uint256)',
        [recipient, `0x${amount.toString(16)}`],
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  async transferFrom(
    sender: string,
    recipient: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'transferFrom(address,uint256)',
        [sender, recipient, `0x${amount.toString(16)}`],
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Destroys `amount` tokens from the caller.
   * @param amount the uint256 id of the token
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burn(
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'burn(uint256)',
        [`0x${amount.toString(16)}`],
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Destroys `amount` tokens from `account`, deducting from the caller's
   * allowance.
   * @param account
   * @param amount
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burnFrom(
    account: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'burnFrom(address,uint256)',
        [account, `0x${amount.toString(16)}`],
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Deposits MRX to wrap into wMRX
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async deposit(
    amount: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send('deposit()', [], amount, gasLimit, 5000);
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Destroys `amount` tokens from the caller witdrawing the
   * amount from the contract's MRX balance.
   * @param amount
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async withdraw(
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'withdraw(uint256)',
        [`0x${amount.toString(16)}`],
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
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).message
            ? (e as any).message //eslint-disable-line @typescript-eslint/no-explicit-any
            : 'An unknown error occurred', //eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }
}
