import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS } from '../constants';
import DGP from './DGP';

describe('DGP', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const dgp = new DGP(CONTRACTS[network].DGP, provider);

  it('should match the Governance address', async () => {
    const governanceAddr = await dgp.governanceAddress();
    equal(
      governanceAddr.toLowerCase().replace('0x', ''),
      CONTRACTS[network].Governance
    );
  }).timeout(30000);
});
