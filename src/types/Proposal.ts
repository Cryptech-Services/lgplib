export type Proposal = [
  id: bigint,
  owner: string,
  title: string,
  desc: string,
  url: string,
  requested: bigint,
  duration: bigint,
  durationsPaid: bigint,
  yesVote: bigint,
  noVote: bigint
];
