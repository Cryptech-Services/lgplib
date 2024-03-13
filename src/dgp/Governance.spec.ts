import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS } from '../constants';
import Governance from './Governance';

describe('Governance', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const governace = new Governance(CONTRACTS[network].Governance, provider);

  it('should match the DGP address', async () => {
    const dgpAddr = await governace.dgpAddress();
    equal(dgpAddr.toLowerCase().replace('0x', ''), CONTRACTS[network].DGP);
  }).timeout(30000);

  it('should match the Budget address', async () => {
    const budgetAddr = await governace.budgetAddress();
    equal(
      budgetAddr.toLowerCase().replace('0x', ''),
      CONTRACTS[network].Budget
    );
  }).timeout(30000);
});
