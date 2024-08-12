import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider } from '@metrixcoin/metrilib';
import { CONTRACTS, WrappedMetrix, getLGPAddress, getLGPContract } from '..';

describe('WrappedMetrix', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let tokenAddr = ZeroAddress.replace('0x', '');
  before(async () => {
    tokenAddr = (await lgp.mrx()).toLowerCase().replace('0x', '');
  });

  it('should match Wrapped Metrix address', async () => {
    equal(tokenAddr, CONTRACTS[network].WrappedMetrix);
  }).timeout(60000);

  it('should be named "Wrapped Metrix"', async () => {
    const mrx = new WrappedMetrix(tokenAddr, provider);
    const name = await mrx.name();
    equal(name, 'Wrapped Metrix');
  }).timeout(60000);

  it('should be have the symbol "wMRX"', async () => {
    const mrx = new WrappedMetrix(tokenAddr, provider);
    const symbol = await mrx.symbol();
    equal(symbol, 'wMRX');
  }).timeout(60000);

  it('should be have 8 decimals', async () => {
    const mrx = new WrappedMetrix(tokenAddr, provider);
    const decimals = await mrx.decimals();
    equal(decimals, 8);
  }).timeout(60000);

  it('should have a MRX balance that matches totalSupply', async () => {
    const mrx = new WrappedMetrix(tokenAddr, provider);
    const supply = await mrx.totalSupply();
    const balance = await mrx.balance();
    equal(balance, supply);
  }).timeout(60000);
});
