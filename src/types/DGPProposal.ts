export enum ProposalType {
  NONE,
  GASSCHEDULE,
  BLOCKSIZE,
  MINGASPRICE,
  BLOCKGASLIMIT,
  TRANSACTIONFEERATES,
  COLLATERAL,
  BUDGETFEE
}
export type DGPProposal = [
  onVote: boolean,
  votes: string[],
  proposalAddress: string,
  proposalHeight: bigint,
  proposalType: ProposalType
];
