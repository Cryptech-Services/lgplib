import {
  MetrixContract,
  Provider,
  Transaction,
  TransactionReceipt
} from '@metrixcoin/metrilib';
import ABI from '../abi';
import { ZeroAddress, ZeroHash } from 'ethers';
import { DGPProposal, ProposalType } from '../types/DGPProposal';
import { GasSchedule } from '../types/GasSchedule';

export default class DGP extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.DGP);
  }

  /**
   * Add new proposal or vote on existing proposal
   * @param proposalType type of proposal {@link ProposalType}
   * @param proposalAddress the EVM style address of the proposed contract
   * @param gasLimit
   * @returns
   */
  async addProposal(
    proposalType: ProposalType,
    proposalAddress: string,
    gasLimit: number | undefined = 250000
  ): Promise<Transaction> {
    try {
      const tx = await this.send(
        'addProposal(uint8,address)',
        [`0x${BigInt(proposalType).toString(16)}`, proposalAddress],
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
   * Get the blockGasLimit contract address
   * @returns {Promise<string>} the EVM style address of the blockGasLimit contract
   */
  async blockGasLimitAddress(): Promise<string> {
    const addr = await this.call(`blockGasLimitAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the blockSizeAddress contract address
   * @returns {Promise<string>} the EVM style address of the blockSizeAddress contract
   */
  async blockSizeAddress(): Promise<string> {
    const addr = await this.call(`blockSizeAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the budgetFeeAddress contract address
   * @returns {Promise<string>} the EVM style address of the budgetFeeAddress contract
   */
  async budgetFeeAddress(): Promise<string> {
    const addr = await this.call(`budgetFeeAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the default block gas limit
   * @returns {Promise<bigint>} the block gas limit as units of gas
   */
  async defaultBlockGasLimit(): Promise<bigint> {
    const def = await this.call(`defaultBlockGasLimit()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   * Get the default block size
   * @returns {Promise<bigint>} the default block size
   */
  async defaultBlockSize(): Promise<bigint> {
    const def = await this.call(`defaultBlockSize()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default budget fee
   * @returns {Promise<bigint>} the default budget fee
   */
  async defaultBudgetFee(): Promise<bigint> {
    const def = await this.call(`defaultBudgetFee()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default dust relay fee
   * @returns {Promise<bigint>} the default dust relay fee
   */
  async defaultDustRelayFee(): Promise<bigint> {
    const def = await this.call(`defaultDustRelayFee()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default EVM gas schedule
   * @returns {Promise<GasSchedule>} the default EVM gas schedule
   */
  async defaultGasSchedule(index: bigint): Promise<GasSchedule> {
    const schedule = await this.call(`defaultGasSchedule()`, [
      `0x${index.toString(16)}`
    ]);
    if (schedule && schedule.length >= 39) {
      const tup: GasSchedule = [
        BigInt(schedule[0].toString()),
        BigInt(schedule[1].toString()),
        BigInt(schedule[2].toString()),
        BigInt(schedule[3].toString()),
        BigInt(schedule[4].toString()),
        BigInt(schedule[5].toString()),
        BigInt(schedule[6].toString()),
        BigInt(schedule[7].toString()),
        BigInt(schedule[8].toString()),
        BigInt(schedule[9].toString()),
        BigInt(schedule[10].toString()),
        BigInt(schedule[11].toString()),
        BigInt(schedule[12].toString()),
        BigInt(schedule[13].toString()),
        BigInt(schedule[14].toString()),
        BigInt(schedule[15].toString()),
        BigInt(schedule[16].toString()),
        BigInt(schedule[17].toString()),
        BigInt(schedule[18].toString()),
        BigInt(schedule[19].toString()),
        BigInt(schedule[20].toString()),
        BigInt(schedule[21].toString()),
        BigInt(schedule[22].toString()),
        BigInt(schedule[23].toString()),
        BigInt(schedule[24].toString()),
        BigInt(schedule[25].toString()),
        BigInt(schedule[26].toString()),
        BigInt(schedule[27].toString()),
        BigInt(schedule[28].toString()),
        BigInt(schedule[29].toString()),
        BigInt(schedule[30].toString()),
        BigInt(schedule[31].toString()),
        BigInt(schedule[32].toString()),
        BigInt(schedule[33].toString()),
        BigInt(schedule[34].toString()),
        BigInt(schedule[35].toString()),
        BigInt(schedule[36].toString()),
        BigInt(schedule[37].toString()),
        BigInt(schedule[38].toString())
      ];
      return tup;
    }
    return [
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0)
    ];
  }

  /**
   *
   * Get the default governance collateral
   * @returns {Promise<bigint>} the default governance collateral
   */
  async defaultGovernanceCollateral(): Promise<bigint> {
    const def = await this.call(`defaultGovernanceCollateral()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default incremental relay fee
   * @returns {Promise<bigint>} the default incremental relay fee
   */
  async defaultIncrementalRelayFee(): Promise<bigint> {
    const def = await this.call(`defaultIncrementalRelayFee()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default minumum gas price
   * @returns {Promise<bigint>} the default minumum gas price
   */
  async defaultMinGasPrice(): Promise<bigint> {
    const def = await this.call(`defaultMinGasPrice()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   *
   * Get the default minumum relay tx fee
   * @returns {Promise<bigint>} the default minumum relay tx fee
   */
  async defaultMinRelayTxFee(): Promise<bigint> {
    const def = await this.call(`defaultMinRelayTxFee()`, []);
    return !isNaN(Number(def ? def.toString() : undefined))
      ? BigInt(def!.toString())
      : BigInt(0);
  }

  /**
   * Get the gasScheduleAddress contract address
   * @returns {Promise<string>} the EVM style address of the gasScheduleAddress contract
   */
  async gasScheduleAddress(): Promise<string> {
    const addr = await this.call(`gasScheduleAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   *
   * Get the current block gas limit
   * @returns {Promise<[bigint]>} the block gas limit
   */
  async getBlockGasLimit(): Promise<[limit: bigint]> {
    const limit = await this.call(`getBlockGasLimit()`, []);
    return !isNaN(Number(limit ? limit[0].toString() : undefined))
      ? [BigInt(limit![0].toString())]
      : [BigInt(0)];
  }

  /**
   *
   * Get the current block size
   * @returns {Promise<[bigint]>} the block size
   */
  async getBlockSize(): Promise<[size: bigint]> {
    const size = await this.call(`getBlockSize()`, []);
    return !isNaN(Number(size ? size[0].toString() : undefined))
      ? [BigInt(size![0].toString())]
      : [BigInt(0)];
  }

  /**
   *
   * Get the current budget fee
   * @returns {Promise<[bigint]>} the budget fee
   */
  async getBudgetFee(): Promise<[fee: bigint]> {
    const fee = await this.call(`getBudgetFee()`, []);
    return !isNaN(Number(fee ? fee[0].toString() : undefined))
      ? [BigInt(fee![0].toString())]
      : [BigInt(0)];
  }

  /**
   *
   * Get the current governance collateral
   * @returns {Promise<[bigint]>} the governace collateral
   */
  async getGovernanceCollateral(): Promise<[fee: bigint]> {
    const collateral = await this.call(`getGovernanceCollateral()`, []);
    return !isNaN(Number(collateral ? collateral[0].toString() : undefined))
      ? [BigInt(collateral![0].toString())]
      : [BigInt(0)];
  }

  /**
   *
   * Get the current minimum gas price
   * @returns {Promise<[bigint]>} the minimum gas price
   */
  async getMinGasPrice(): Promise<[min: bigint]> {
    const min = await this.call(`getMinGasPrice()`, []);
    return !isNaN(Number(min ? min[0].toString() : undefined))
      ? [BigInt(min![0].toString())]
      : [BigInt(0)];
  }

  /**
   *
   * Get the current EVM gas schedule
   * @returns {Promise<GasSchedule>} the EVM gas schedule
   */
  async getSchedule(): Promise<GasSchedule> {
    const schedule = await this.call(`getSchedule()`, []);
    if (schedule && schedule.length >= 39) {
      const tup: GasSchedule = [
        BigInt(schedule[0].toString()),
        BigInt(schedule[1].toString()),
        BigInt(schedule[2].toString()),
        BigInt(schedule[3].toString()),
        BigInt(schedule[4].toString()),
        BigInt(schedule[5].toString()),
        BigInt(schedule[6].toString()),
        BigInt(schedule[7].toString()),
        BigInt(schedule[8].toString()),
        BigInt(schedule[9].toString()),
        BigInt(schedule[10].toString()),
        BigInt(schedule[11].toString()),
        BigInt(schedule[12].toString()),
        BigInt(schedule[13].toString()),
        BigInt(schedule[14].toString()),
        BigInt(schedule[15].toString()),
        BigInt(schedule[16].toString()),
        BigInt(schedule[17].toString()),
        BigInt(schedule[18].toString()),
        BigInt(schedule[19].toString()),
        BigInt(schedule[20].toString()),
        BigInt(schedule[21].toString()),
        BigInt(schedule[22].toString()),
        BigInt(schedule[23].toString()),
        BigInt(schedule[24].toString()),
        BigInt(schedule[25].toString()),
        BigInt(schedule[26].toString()),
        BigInt(schedule[27].toString()),
        BigInt(schedule[28].toString()),
        BigInt(schedule[29].toString()),
        BigInt(schedule[30].toString()),
        BigInt(schedule[31].toString()),
        BigInt(schedule[32].toString()),
        BigInt(schedule[33].toString()),
        BigInt(schedule[34].toString()),
        BigInt(schedule[35].toString()),
        BigInt(schedule[36].toString()),
        BigInt(schedule[37].toString()),
        BigInt(schedule[38].toString())
      ];
      return tup;
    }
    return [
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0)
    ];
  }

  /**
   *
   * Get the current transaction fee rates
   * @returns {Promise<[relayTxFee: bigint, incrementalRelayFee: bigint, dustRelayFee: bigint]>} the transaction fee rates
   */
  async getTransactionFeeRates(): Promise<
    [relayTxFee: bigint, incrementalRelayFee: bigint, dustRelayFee: bigint]
  > {
    const rates = await this.call(`getTransactionFeeRates()`, []);
    if (rates && rates.length >= 3) {
      const tup: [
        relayTxFee: bigint,
        incrementalRelayFee: bigint,
        dustRelayFee: bigint
      ] = [
        BigInt(rates[0].toString()),
        BigInt(rates[1].toString()),
        BigInt(rates[2].toString())
      ];
      return tup;
    }
    return [BigInt(0), BigInt(0), BigInt(0)];
  }

  /**
   * Get the Governance contract address
   * @returns {Promise<string>} the EVM style address of the Governance contract
   */
  async governanceAddress(): Promise<string> {
    const addr = await this.call(`governanceAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the governanceCollateralAddress contract address
   * @returns {Promise<string>} the EVM style address of the governanceCollateralAddress contract
   */
  async governanceCollateralAddress(): Promise<string> {
    const addr = await this.call(`governanceCollateralAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get the max block gas limit
   * @returns {Promise<bigint>} the max block gas limit as units of gas
   */
  async maxBlockGasLimit(): Promise<bigint> {
    const max = await this.call(`maxBlockGasLimit()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max block size
   * @returns {Promise<bigint>} the max block size
   */
  async maxBlockSize(): Promise<bigint> {
    const max = await this.call(`maxBlockSize()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max budget fee
   * @returns {Promise<bigint>} the max budget fee
   */
  async maxBudgetFee(): Promise<bigint> {
    const max = await this.call(`maxBudgetFee()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }
  /**
   * Get the max dust relay fee
   * @returns {Promise<bigint>} the max dust relay fee
   */
  async maxDustRelayFee(): Promise<bigint> {
    const max = await this.call(`maxDustRelayFee()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max governance collateral
   * @returns {Promise<bigint>} the max governance collateral
   */
  async maxGovernanceCollateral(): Promise<bigint> {
    const max = await this.call(`maxGovernanceCollateral()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the incremental relay fee
   * @returns {Promise<bigint>} the max incremental relay fee
   */
  async maxIncrementalRelayFee(): Promise<bigint> {
    const max = await this.call(`maxIncrementalRelayFee()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max minimum gas price
   * @returns {Promise<bigint>} the max minimum gas price
   */
  async maxMinGasPrice(): Promise<bigint> {
    const max = await this.call(`maxMinGasPrice()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max minimum relay transaction fee
   * @returns {Promise<bigint>} the max minimum relay transaction fee
   */
  async maxMinRelayTxFee(): Promise<bigint> {
    const max = await this.call(`maxMinRelayTxFee()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the max block gas limit
   * @returns {Promise<bigint>} the max block gas limit
   */
  async minBlockGasLimit(): Promise<bigint> {
    const max = await this.call(`minBlockGasLimit()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the minimum block size
   * @returns {Promise<bigint>} the minimum block size
   */
  async minBlockSize(): Promise<bigint> {
    const max = await this.call(`minBlockSize()`, []);
    return !isNaN(Number(max ? max.toString() : undefined))
      ? BigInt(max!.toString())
      : BigInt(0);
  }

  /**
   * Get the minGasPriceAddress contract address
   * @returns {Promise<string>} the EVM style address of the minGasPriceAddress contract
   */
  async minGasPriceAddress(): Promise<string> {
    const addr = await this.call(`minGasPriceAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }

  /**
   * Get any current DGP proposal
   * @returns {Promise<DGPProposal>} the DGP proposal
   */
  async proposal(): Promise<DGPProposal> {
    const p = await this.call(`proposal()`, []);
    if (p && p.length >= 5) {
      const tup: DGPProposal = [
        p[0].toString() === 'true',
        p[1].toArray() as string[],
        p[2].toString(),
        BigInt(p[3].toString()),
        Number(p[4].toString())
      ];
      return tup;
    }
    return [false, [], ZeroAddress, BigInt(0), ProposalType.NONE];
  }

  /**
   * Get the transactionFeeRatesAddress contract address
   * @returns {Promise<string>} the EVM style address of the transactionFeeRatesAddress contract
   */
  async transactionFeeRatesAddress(): Promise<string> {
    const addr = await this.call(`transactionFeeRatesAddress()`, []);
    return addr ? addr.toString() : ZeroAddress;
  }
}
