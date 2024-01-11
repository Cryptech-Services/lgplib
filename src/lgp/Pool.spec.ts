import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS, Pool, getLGPAddress, getLGPContract } from '..';

describe('Pool', () => {
  const network = 'TestNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let poolAddr = ZeroAddress.replace('0x', '');
  before(async () => {
    poolAddr = (await lgp.pool()).toLowerCase().replace('0x', '');
  });

  it('should match the Metrix LGP:Pool address', async () => {
    equal(poolAddr, CONTRACTS[network].Pool);
  }).timeout(30000);

  it('should match the LiquidGovernance-LP address', async () => {
    const pool = new Pool(poolAddr, provider);
    const address: string = await pool.lp();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].LiquidityProvider
    );
  }).timeout(30000);

  it('should match the LiquidGovernance address for Wrapped Metrix', async () => {
    const pool = new Pool(poolAddr, provider);
    const address1: string = await lgp.mrx();
    const address2: string = await pool.mrx();
    equal(
      address1.replace('0x', '').toLowerCase(),
      address2.replace('0x', '').toLowerCase()
    );
  }).timeout(30000);

  it('should match the LiquidGovernance address for Liquid Governor Metrix', async () => {
    const pool = new Pool(poolAddr, provider);
    const address1: string = await lgp.gmrx();
    const address2: string = await pool.gmrx();
    equal(
      address1.replace('0x', '').toLowerCase(),
      address2.replace('0x', '').toLowerCase()
    );
  }).timeout(30000);
});
