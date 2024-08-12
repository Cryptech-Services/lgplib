import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS, Gov, getLGPAddress, getLGPContract } from '..';

describe('Gov', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let tokenAddr = ZeroAddress.replace('0x', '');
  before(async () => {
    tokenAddr = (await lgp.g()).toLowerCase().replace('0x', '');
  });

  it('should match Gov address', async () => {
    equal(tokenAddr, CONTRACTS[network].Gov);
  }).timeout(60000);

  it('should be owned by Metrix LGP', async () => {
    const g = new Gov(tokenAddr, provider);
    const address: string = await g.owner();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].LiquidGovernance
    );
  }).timeout(60000);

  it('should be named "Gov"', async () => {
    const g = new Gov(tokenAddr, provider);
    const name = await g.name();
    equal(name, 'Gov');
  }).timeout(60000);

  it('should be have the symbol "g"', async () => {
    const g = new Gov(tokenAddr, provider);
    const symbol = await g.symbol();
    equal(symbol, 'g');
  }).timeout(60000);
});
