import { ZeroAddress, ZeroHash } from 'ethers';
import ABI from '../abi';
import { ProposalType, Vote } from '../enum';
import {
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';

export default class LiquidGovernance extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.LiquidGovernance);
  }

  /**
   * Add new proposal or vote on existing proposal
   * @param governorAddress the EVM style address of the AutoGovernor
   * @param proposalType the {@link ProposalType} for the contract
   * @param proposalAddress the EVM style address of the proposed DGP proxy contract
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async addProposal(
    governorAddress: string,
    proposalType: ProposalType,
    proposalAddress: string,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'addProposal(address,uint8,address)',
        [
          governorAddress,
          `0x${BigInt(proposalType).toString(16)}`,
          proposalAddress
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
   * Create a new governor by providing DGP collateral
   * @param collateral
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async createGovernor(
    collateral: string | undefined = '0',
    gasLimit: number | undefined = 1340393
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'createGovernor()',
        [],
        collateral,
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
   * Get the Metrix DGP Governance contract address
   * @returns {Promise<string>} the EVM style address of the Metrix DGP Governance contract
   */
  async governance(): Promise<string> {
    const t = await this.call(`governance()`, []);
    return t ? t.toString() : ZeroAddress;
  }

  /**
   * Get the MNSRegistry contract address
   * @returns {Promise<string>} the EVM style address of the MNSRegistry contract
   */
  async mns(): Promise<string> {
    const t = await this.call(`mns()`, []);
    return t ? t.toString() : ZeroAddress;
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
   * Ping the DGP as the AutoGovernor
   * @param governorAddress the EVM style address of the AutoGovernor
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async ping(
    governorAddress: string,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'ping(address)',
        [governorAddress],
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
   * Get the MetrixLGP:Pool contract address
   * @returns {Promise<string>} the EVM style address of the MetrixLGP:Pool contract
   */
  async pool(): Promise<string> {
    const p = await this.call(`pool()`, []);
    return p ? p.toString() : ZeroAddress;
  }
  /**
   * Start a new Budget proposal
   * @param governorAddress the EVM style address of the AutoGovernor
   * @param title title of the proposal
   * @param description a short description of the proposal
   * @param url a url that can be visited for more information on the proposal
   * @param requested the amount of MRX requested as satoshi
   * @param duration the duration in months of the proposal
   * @param collateral the collateral to submit the proposal
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async startProposal(
    governorAddress: string,
    title: string,
    description: string,
    url: string,
    requested: bigint,
    duration: bigint,
    collateral: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'startProposal(address,string,string,string,uint256,uint8)',
        [
          governorAddress,
          title,
          description,
          url,
          `0x${requested.toString(16)}`,
          `0x${duration.toString(16)}`
        ],
        collateral,
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
   * Unenroll from the DGP as the AutoGovernor burning g token from the sender
   * @param governorAddress the EVM style address of the AutoGovernor
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async unenroll(
    governorAddress: string,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'unenroll(address,bool)',
        [governorAddress, false],
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
   * Vote on a Metrix DGP Budget proposal
   * @param governorAddress the EVM style address of the AutoGovernor
   * @param proposalId the id of the proposal
   * @param vote the {@link Vote} to be cast
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async voteForProposal(
    governorAddress: string,
    proposalId: bigint,
    vote: Vote,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'voteForProposal(address,uint8,uint8)',
        [
          governorAddress,
          `0x${proposalId.toString(16)}`,
          `0x${vote.toString(16)}`
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
