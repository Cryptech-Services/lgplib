import { CONTRACTS } from '../constants';
import { NetworkType, Provider } from '@metrixcoin/metrilib';
import { LiquidGovernance } from '../lgp';

const getLGPAddress = (network: NetworkType) => {
  return CONTRACTS[network].LiquidGovernance;
};

const getLGPContract = (address: string, provider: Provider) => {
  return new LiquidGovernance(address, provider);
};
export { getLGPAddress, getLGPContract };
