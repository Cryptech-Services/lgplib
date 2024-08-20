import {
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';
import ABI from '../abi';
import { ZeroAddress, ZeroHash } from 'ethers';
import { Proposal } from '../types/Proposal';

export enum Vote {
  NEW,
  ABSTAIN,
  NO,
  YES
}

export default class Budget extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.Budget);
  }

  /**
   * Get the contract balance
   * @returns {Promise<bigint>} the balance of the contract in satoshi
   */
  async balance(): Promise<bigint> {
    const bal = await this.call(`balance()`, []);
    return !isNaN(Number(bal ? bal.toString() : undefined))
      ? BigInt(bal!.toString())
      : BigInt(0);
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
   * Deposits MRX into the Budget contract
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async fund(
    amount: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send('fund()', [], amount, gasLimit, 5000);
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
   * Get the index of a specific proposal
   * @param proposalId the id of the proposal
   * @returns
   */
  async getProposalIndex(proposalId: bigint): Promise<bigint> {
    const index = await this.call(`getProposalIndex(uint8)`, [
      `0x${proposalId.toString(16)}`
    ]);
    return !isNaN(Number(index ? index.toString() : undefined))
      ? BigInt(index!.toString())
      : BigInt(0);
  }

  /**
   * Get the Governance contract address
   * @returns {Promise<string>} the EVM style address of the Governance contract
   */
  async governanceAddress(): Promise<string> {
    const addr = await this.call(`governanceAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  async proposalCount(): Promise<bigint> {
    const count = await this.call(`proposalCount()`, []);
    return !isNaN(Number(count ? count.toString() : undefined))
      ? BigInt(count!.toString())
      : BigInt(0);
  }

  /**
   * Get a proposal's vote status
   * @param proposalId the id of the proposal
   * @returns {Promise<Vote>} the status of the vote
   */
  async proposalVoteStatus(proposalId: bigint): Promise<Vote> {
    const status = await this.call(`proposalVoteStatus(uint8)`, [
      `0x${proposalId.toString(16)}`
    ]);
    return !isNaN(Number(status ? status.toString() : undefined))
      ? Number(status!.toString())
      : Number(0);
  }

  /**
   * Get a specific proposal by id
   * @param proposalId the id of the proposal
   * @returns {Promise<Proposal>} the propsal
   */
  async proposals(proposalId: bigint): Promise<Proposal> {
    const q = await this.call(`proposals(uint256)`, [
      `0x${proposalId.toString(16)}`
    ]);
    if (q && q.length >= 10) {
      const tup: Proposal = [
        BigInt(q[0].toString()),
        q[1].toString().toLowerCase().replace('0x', ''),
        q[2].toString(),
        q[3].toString(),
        q[4].toString(),
        BigInt(q[5].toString()),
        BigInt(q[6].toString()),
        BigInt(q[7].toString()),
        BigInt(q[8].toString()),
        BigInt(q[9].toString())
      ];
      return tup;
    }
    return [
      BigInt(0),
      ZeroAddress.toLowerCase().replace('0x', ''),
      '',
      '',
      '',
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0)
    ];
  }

  /**
   * Settles the monthly budget
   * @param gasLimit the optional limit for gas units that can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async settleBudget(
    amount: string | undefined = '0',
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send('settleBudget()', [], amount, gasLimit, 5000);
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
   * Cast a vote for a proposal
   * @param proposalId the id of the proposal
   * @param vote  the {@link Vote} to cast
   * @param gasLimit
   * @returns
   */
  async voteForProposal(
    proposalId: bigint,
    vote: Vote,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'voteForProposal(uint8,uint8)',
        [`0x${proposalId.toString(16)}`, `0x${BigInt(vote).toString(16)}`],
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
