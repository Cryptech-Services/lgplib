import {
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';
import ABI from '../abi';
import { ZeroAddress, ZeroHash } from 'ethers';
import { Governor } from '../types/Governor';

export default class Governance extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.Governance);
  }

  /**
   * Get the contract balance
   * @returns {Promise<bigint>} the balance of the contract in satoshi
   */
  async balance(): Promise<bigint> {
    const bal = await this.call(`balance()`, []);
    return !isNaN(Number(bal ? bal.toString() : undefined))
      ? BigInt(
          bal!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Get the Budget contract address
   * @returns {Promise<string>} the EVM style address of the Budget contract
   */
  async budgetAddress(): Promise<string> {
    const addr = await this.call(`budgetAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the current reward winner
   * @returns {Promise<string>} the EVM style address of the reward winner
   */
  async currentWinner(): Promise<string> {
    const addr = await this.call(`currentWinner()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the DGP contract address
   * @returns {Promise<string>} the EVM style address of the DGP contract
   */
  async dgpAddress(): Promise<string> {
    const addr = await this.call(`dgpAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Enroll as a governor
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async enroll(
    amount: string | undefined = '7500000',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send('ping()', [], amount, gasLimit, 5000);
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
   * Get the current reward winner
   * @returns {Promise<string>} the EVM style address of the reward winner
   */
  async getGovernorsAddresses(): Promise<string[]> {
    const addresses = await this.call(`getGovernorsAddresses()`, []);
    return addresses ? addresses.toArray() : [];
  }

  /**
   * Get the current governor count
   * @returns {Promise<bigint>} the count of governors currently
   */
  async governorCount(): Promise<bigint> {
    const count = await this.call(`governorCount()`, []);
    return !isNaN(Number(count ? count.toString() : undefined))
      ? BigInt(
          count!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   * Get the governor from the mapping
   * @param governorAddress the EVM style address of the governor
   * @returns {Promise<Governor>} the governor
   */
  async governors(governorAddress: string): Promise<Governor> {
    const q = await this.call(`governors(uint256)`, [governorAddress]);
    if (q && q.length >= 5) {
      const tup: Governor = [
        BigInt(q[0].toString()),
        BigInt(q[1].toString()),
        BigInt(q[2].toString()),
        BigInt(q[3].toString()),
        BigInt(q[4].toString())
      ];
      return tup;
    }
    return [BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0)];
  }

  /**
   * Ping to stay enrolled
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async ping(gasLimit: number | undefined = 250000): Promise<Transaction> {
    try {
      const tx = await this.send('ping()', [], '0', gasLimit, 5000);
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
   * Remove the next 2 inactive governors
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async removeInactiveGovernor(
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'removeInactiveGovernor()',
        [],
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
   * Unenroll from being governor
   * @param force
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async unenroll(
    force: boolean,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send('ping()', [force], '0', gasLimit, 5000);
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
