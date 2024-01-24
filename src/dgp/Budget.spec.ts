import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS } from '../constants';
import Budget from './Budget';

describe('Budget', () => {
  const network = 'TestNet';
  const provider = new APIProvider(network);

  const budget = new Budget(CONTRACTS[network].Budget, provider);

  it('should match the Governance address', async () => {
    const governanceAddr = await budget.governanceAddress();
    equal(
      governanceAddr.toLowerCase().replace('0x', ''),
      CONTRACTS[network].Governance
    );
  }).timeout(30000);

  it('should match the DGP address', async () => {
    const dgpAddr = await budget.dgpAddress();
    equal(dgpAddr.toLowerCase().replace('0x', ''), CONTRACTS[network].DGP);
  }).timeout(30000);
});
