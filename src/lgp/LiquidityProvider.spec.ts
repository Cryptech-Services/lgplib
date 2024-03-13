import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import {
  CONTRACTS,
  LiquidityProvider,
  Pool,
  getLGPAddress,
  getLGPContract
} from '..';

describe('LiquidityProvider', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let poolAddr = ZeroAddress.replace('0x', '');
  let tokenAddr = ZeroAddress.replace('0x', '');
  before(async () => {
    poolAddr = (await lgp.pool()).toLowerCase().replace('0x', '');
    const pool = new Pool(poolAddr, provider);
    tokenAddr = (await pool.lp()).replace('0x', '').toLowerCase();
  });

  it('should match LiquidGovernance-LP address', async () => {
    equal(tokenAddr, CONTRACTS[network].LiquidityProvider);
  }).timeout(30000);

  it('should be owned by Metrix LGP:Pool', async () => {
    const lp = new LiquidityProvider(tokenAddr, provider);
    const address = (await lp.owner()).replace('0x', '').toLowerCase();
    equal(address, poolAddr);
  }).timeout(30000);

  it('should be named "LiquidGovernance-LP"', async () => {
    const lp = new LiquidityProvider(tokenAddr, provider);
    const name = await lp.name();
    equal(name, 'LiquidGovernance-LP');
  }).timeout(30000);

  it('should be have the symbol "LGP-LP"', async () => {
    const lp = new LiquidityProvider(tokenAddr, provider);
    const symbol = await lp.symbol();
    equal(symbol, 'LGP-LP');
  }).timeout(30000);

  it('should be have 18 decimals', async () => {
    const lp = new LiquidityProvider(tokenAddr, provider);
    const decimals = await lp.decimals();
    equal(decimals, 18);
  }).timeout(30000);
});
