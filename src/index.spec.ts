import { ZeroAddress } from 'ethers';
import { equal } from 'assert';
import { APIProvider, Provider, Transaction } from '@metrixcoin/metrilib';
import { Pool, getLGPAddress, getLGPContract } from '.';
import {
  BaseResolver,
  MNS,
  Name,
  getMNSAddress,
  profiles
} from '@metrixnames/mnslib';
import ABI from '@metrixnames/mnslib/lib/abi';

describe('MNS Labels', () => {
  const network = 'TestNet';
  const provider = new APIProvider(network);

  const lgp = getLGPContract(getLGPAddress(network), provider);

  let mnsAddr = ZeroAddress.replace('0x', '');
  before(async () => {
    mnsAddr = (await lgp.mns()).toLowerCase().replace('0x', '');
  });

  it(`should have "Metrix LGP" as an address.addr.reverse name`, async () => {
    const lgpAddr = getLGPAddress(network);
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${lgpAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Metrix LGP');
  }).timeout(30000);

  it(`should have "Metrix LGP:Gov (g)" as an address.addr.reverse name`, async () => {
    const gAddr = (await lgp.g()).toLowerCase().replace('0x', '');
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${gAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Metrix LGP:Gov (g)');
  }).timeout(30000);

  it(`should have "Metrix LGP:Pool" as an address.addr.reverse name`, async () => {
    const poolAddr = (await lgp.pool()).toLowerCase().replace('0x', '');
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${poolAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Metrix LGP:Pool');
  }).timeout(30000);

  it(`should have "Wrapped Metrix (wMRX)" as an address.addr.reverse name`, async () => {
    const mrxAddr = (await lgp.mrx()).toLowerCase().replace('0x', '');
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${mrxAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Wrapped Metrix (wMRX)');
  }).timeout(30000);

  it(`should have "Metrix LGP:Liquid Governor MRX (gMRX)" as an address.addr.reverse name`, async () => {
    const gmrxAddr = (await lgp.gmrx()).toLowerCase().replace('0x', '');
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${gmrxAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Metrix LGP:Liquid Governor MRX (gMRX)');
  }).timeout(30000);

  it(`should have "Metrix LGP:LiquidGovernance-LP (LGP-LP)" as an address.addr.reverse name`, async () => {
    const poolAddr = (await lgp.pool()).toLowerCase().replace('0x', '');
    const lpAddr = (await new Pool(poolAddr, provider).lp())
      .toLowerCase()
      .replace('0x', '');
    const mns = new MNS(network, provider, getMNSAddress(network));
    const lookup = `${lpAddr}.addr.reverse`;
    const mnsName: Name = mns.name(lookup);

    const resolverAddr: string = await mnsName.getResolverAddr();

    const resolver: profiles.NameResolver = new (class
      extends BaseResolver
      implements profiles.NameResolver
    {
      constructor(provider: Provider) {
        super(resolverAddr, provider, ABI.DefaultReverseResolver);
      }

      async setName(node: string, name: string): Promise<Transaction> {
        node;
        name;
        throw new Error();
      }

      async name(node: string): Promise<string> {
        const result = await this.call('name(bytes32)', [node]);
        if (result) {
          return result.toString();
        }
        return '';
      }
    })(provider);

    const name = await resolver.name(mnsName.hash);
    equal(name, 'Metrix LGP:LiquidGovernance-LP (LGP-LP)');
  }).timeout(30000);
});
