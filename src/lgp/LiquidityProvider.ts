import ABI from '../abi';
import {
  ERC20,
  MetrixContract,
  Provider,
  Transaction
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
    const tx = await this.send(
      'increaseAllowance(address,uint256)',
      [spender, `0x${amount.toString(16)}`],
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

  async decreaseAllowance(
    spender: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'decreaseAllowance(address,uint256)',
      [spender, `0x${amount.toString(16)}`],
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
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'approve(address,uint256)',
      [spender, `0x${amount.toString(16)}`],
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
    const tx = await this.send(
      'transfer(address,uint256)',
      [recipient, `0x${amount.toString(16)}`],
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

  async transferFrom(
    sender: string,
    recipient: string,
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'transferFrom(address,uint256)',
      [sender, recipient, `0x${amount.toString(16)}`],
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
   * Destroys `amount` tokens from the caller.
   * @param account the uint256 id of the token
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burn(
    amount: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'burn(uint256)',
      [`0x${amount.toString(16)}`],
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
    const tx = await this.send(
      'burnFrom(address,uint256)',
      [account, `0x${amount.toString(16)}`],
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
   * Mints `amount` tokens to `to`, can only be called by the owner Metrix LGP:Pool
   * @param to the EVM style address of the account to mint to
   * @param amount the uint256 amount of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async mint(to: string, amount: bigint): Promise<Transaction> {
    const tx = await this.send('mint(address,uint256)', [
      to,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : '';
  }

  /**
   * Renounce ownership of this contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async renounceOwnership(): Promise<Transaction> {
    const tx = await this.send('renounceOwnership()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Transfer ownership of this contract
   * @param address the EVM adddress of the receiver
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async transferOwnership(address: string): Promise<Transaction> {
    const tx = await this.send('transferOwnership(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
