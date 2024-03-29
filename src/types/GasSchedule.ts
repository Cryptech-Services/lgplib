export type GasSchedule = [
  tierStepGas0: bigint,
  tierStepGas1: bigint,
  tierStepGas2: bigint,
  tierStepGas3: bigint,
  tierStepGas4: bigint,
  tierStepGas5: bigint,
  tierStepGas6: bigint,
  tierStepGas7: bigint,
  expGas: bigint,
  expByteGas: bigint,
  sha3Gas: bigint,
  sha3WordGas: bigint,
  sloadGas: bigint,
  sstoreSetGas: bigint,
  sstoreResetGas: bigint,
  sstoreRefundGas: bigint,
  jumpdestGas: bigint,
  logGas: bigint,
  logDataGas: bigint,
  logTopicGas: bigint,
  createGas: bigint,
  callGas: bigint,
  callStipend: bigint,
  callValueTransferGas: bigint,
  callNewAccountGas: bigint,
  suicideRefundGas: bigint,
  memoryGas: bigint,
  quadCoeffDiv: bigint,
  createDataGas: bigint,
  txGas: bigint,
  txCreateGas: bigint,
  txDataZeroGas: bigint,
  txDataNonZeroGas: bigint,
  copyGas: bigint,
  extcodesizeGas: bigint,
  extcodecopyGas: bigint,
  balanceGas: bigint,
  suicideGas: bigint,
  maxCodeSize: bigint
];
