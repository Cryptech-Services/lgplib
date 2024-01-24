import { ZeroAddress, ZeroHash } from 'ethers';
import ABI from '../abi';
import {
  ERC20,
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';

export default class LiquidityProvider extends MetrixContract implements ERC20 {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.LiquidityProvider);
  }

  async increaseAllowance(
    spender: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'increaseAllowance(address,uint256)',
        [spender, `0x${amount.toString(16)}`],
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

  async decreaseAllowance(
    spender: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'decreaseAllowance(address,uint256)',
        [spender, `0x${amount.toString(16)}`],
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
      ? Number(
          dec! /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : Number(0);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    const allowance = await this.call(`allowance(address,address)`, [
      owner,
      spender
    ]);
    return !isNaN(Number(allowance ? allowance.toString() : undefined))
      ? BigInt(
          allowance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async approve(
    spender: string,
    amount: bigint,
    gasLimit: number | undefined = 48659
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
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(
          balance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(
          total!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
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
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
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
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Destroys `amount` tokens from the caller.
   * @param amount the satoshi amount of the tokens to destroy
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
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Destroys `amount` tokens from `account`, deducting from the caller's
   * allowance.
   * @param account the EVM style address of the account to burn from
   * @param amount the uint256 id of the token
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
          message: (e as any).message
            ? (e as any).message
            : 'An unknown error occurred',
          code: (e as any).code ? (e as any).code : undefined
        }
      };
    }
  }

  /**
   * Mints `amount` tokens to `to`, can only be called by the owner Metrix LGP:Pool
   * @param to the EVM style address of the account to mint to
   * @param amount the uint256 amount of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async mint(to: string, amount: bigint): Promise<Transaction> {
    try {
      const tx = await this.send('mint(address,uint256)', [
        to,
        `0x${amount.toString(16)}`
      ]);
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
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : ZeroAddress;
  }

  /**
   * Renounce ownership of this contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async renounceOwnership(): Promise<Transaction> {
    try {
      const tx = await this.send('renounceOwnership()', []);
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
   * Transfer ownership of this contract
   * @param address the EVM adddress of the receiver
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async transferOwnership(address: string): Promise<Transaction> {
    try {
      const tx = await this.send('transferOwnership(address)', [address]);
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
