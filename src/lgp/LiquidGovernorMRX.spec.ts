import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import {
  CONTRACTS,
  LiquidGovernorMRX,
  getLGPAddress,
  getLGPContract
} from '..';

describe('LiquidGovernorMRX', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let tokenAddr = ZeroAddress.replace('0x', '');
  let totalSupply = BigInt(0);
  before(async () => {
    tokenAddr = (await lgp.gmrx()).toLowerCase().replace('0x', '');
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    totalSupply = await gmrx.totalSupply();
  });

  it('should match Liquid Governor Metrix address', async () => {
    equal(tokenAddr, CONTRACTS[network].LiquidGovernorMRX);
  }).timeout(30000);

  it('should be owned by Metrix LGP', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const address: string = await gmrx.owner();
    equal(
      address.replace('0x', '').toLowerCase(),
      CONTRACTS[network].LiquidGovernance
    );
  }).timeout(30000);

  it('should be named "Liquid Governor Metrix"', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const name = await gmrx.name();
    equal(name, 'Liquid Governor Metrix');
  }).timeout(30000);

  it('should be have the symbol "gMRX"', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const symbol = await gmrx.symbol();
    equal(symbol, 'gMRX');
  }).timeout(30000);

  it('should be have 8 decimals', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const decimals = await gmrx.decimals();
    equal(decimals, 8);
  }).timeout(30000);

  it('should be 10% of the supply for maxFlashLoan', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const max: bigint = await gmrx.maxFlashLoan(tokenAddr);
    const tenPercent = totalSupply / BigInt(10);
    equal(max, tenPercent);
  }).timeout(30000);

  it('should be 1% fee for flash loan', async () => {
    const gmrx = new LiquidGovernorMRX(tokenAddr, provider);
    const fee: bigint = await gmrx.flashFee(tokenAddr, BigInt(10000000000));
    const onePercent = BigInt(10000000000) / BigInt(100);
    equal(fee, onePercent);
  }).timeout(30000);
});
