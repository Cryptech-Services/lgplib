import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS, getLGPAddress, getLGPContract } from '..';

describe('LiquidGovernance', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  it('should match Wrapped Metrix address', async () => {
    const address: string = await lgp.mrx();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].WrappedMetrix
    );
  }).timeout(60000);

  it('should match Liquid Governor Metrix address', async () => {
    const address: string = await lgp.gmrx();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].LiquidGovernorMRX
    );
  }).timeout(60000);

  it('should have a pool that matches the Metrix LGP:Pool address', async () => {
    const address: string = await lgp.pool();
    equal(address.replace('0x', '').toLowerCase(), CONTRACTS[network].Pool);
  }).timeout(60000);

  it('should match Gov address', async () => {
    const address: string = await lgp.g();
    equal(address.replace('0x', '').toLowerCase(), CONTRACTS[network].Gov);
  }).timeout(60000);

  it('should match MainNet Governance address', async () => {
    const address: string = await lgp.governance();
    equal(
      address.replace('0x', '').toLowerCase(),
      '73e6c0383dceed1583eb6a4b2aa9253020cb2b18'
    );
  }).timeout(60000);
});
