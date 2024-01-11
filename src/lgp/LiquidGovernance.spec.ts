import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS, getLGPAddress, getLGPContract } from '..';

describe('LiquidGovernance', () => {
  const network = 'TestNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  it('should match Wrapped Metrix address', async () => {
    const address: string = await lgp.mrx();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].WrappedMetrix
    );
  }).timeout(30000);

  it('should match Liquid Governor Metrix address', async () => {
    const address: string = await lgp.gmrx();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].LiquidGovernorMRX
    );
  }).timeout(30000);

  it('should have a pool that matches the Metrix LGP:Pool address', async () => {
    const address: string = await lgp.pool();
    equal(address.replace('0x', '').toLowerCase(), CONTRACTS[network].Pool);
  }).timeout(30000);

  it('should match Gov address', async () => {
    const address: string = await lgp.g();
    equal(address.replace('0x', '').toLowerCase(), CONTRACTS[network].Gov);
  }).timeout(30000);

  it('should match TestNet Governance address', async () => {
    const address: string = await lgp.governance();
    equal(
      address.replace('0x', '').toLowerCase(),
      '3cc15a2bae287cabb1ef6f26a86fa6f1895708eb'
    );
  }).timeout(30000);
});
