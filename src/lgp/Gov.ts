import { ZeroAddress, ZeroHash } from 'ethers';
import ABI from '../abi';
import {
  IERC721Enumerable,
  MetrixContract,
  Provider,
  Transaction
} from '@metrixcoin/metrilib';

export default class Gov extends MetrixContract implements IERC721Enumerable {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.Gov);
  }
  async totalSupply(): Promise<bigint> {
    const total = await this.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(
          total!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async tokenByIndex(index: bigint): Promise<string> {
    const tkn = await this.call(`tokenByIndex(uint256)`, [
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ZeroHash;
  }

  async tokenOfOwnerByIndex(owner: string, index: bigint): Promise<string> {
    const tkn = await this.call(`tokenOfOwnerByIndex(address,uint256)`, [
      owner,
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ZeroHash;
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(
          balance!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  async ownerOf(tokenId: bigint): Promise<string> {
    const owner = await this.call(`ownerOf(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return owner ? owner.toString() : ZeroAddress;
  }

  async safeTransferFrom(
    from: string,
    to: string,
    tokenId: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'safeTransferFrom(address,address,uint256)',
      [from, to, `0x${tokenId.toString(16)}`],
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
    from: string,
    to: string,
    tokenId: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'transferFrom(address,address,uint256)',
      [from, to, `0x${tokenId.toString(16)}`],
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

  async approve(
    to: string,
    tokenId: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'approve(address,uint256)',
      [to, `0x${tokenId.toString(16)}`],
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

  async getApproved(tokenId: bigint): Promise<string> {
    const approved = await this.call(`getApproved(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return approved ? approved.toString() : ZeroAddress;
  }

  async setApprovalForAll(
    operator: string,
    approved: boolean,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'setApprovalForAll(address,bool)',
      [operator, approved],
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

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    const approvedForAll = await this.call(
      `isApprovedForAll(address,address)`,
      [owner, operator]
    );
    return approvedForAll ? approvedForAll.toString() === 'true' : false;
  }

  async safeTransferFromData(
    from: string,
    to: string,
    tokenId: bigint,
    data: string,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'safeTransferFrom(address,address,uint256,bytes)',
      [from, to, `0x${tokenId.toString(16)}`, data],
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

  async tokenURI(tokenId: bigint): Promise<string> {
    const uri = await this.call(`tokenURI(uint256)`, [
      `0x${tokenId.toString(16)}`
    ]);
    return uri ? uri.toString() : '';
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    const result = await this.call('supportsInterface(bytes4)', [interfaceId]);
    return result ? result.toString() === 'true' : false;
  }

  /**
   * Burn a token, permanently removing it from the supply
   * @param tokenId the uint256 id of the token
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async burn(
    tokenId: bigint,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    const tx = await this.send(
      'burn(uint256)',
      [`0x${tokenId.toString(16)}`],
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
   * Safely mints `tokenId` and transfers it to `to`.
   * @param to the EVM style address of the account to mint to
   * @param amount the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async safeMint(to: string, tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('safeMint(address,uint256)', [
      to,
      `0x${tokenId.toString(16)}`
    ]);
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
