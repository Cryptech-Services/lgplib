export const LiquidGovernance = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_governance',
        type: 'address'
      },
      { internalType: 'address', name: '_mrx', type: 'address' },
      { internalType: 'address', name: '_mns', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'governor',
        type: 'address'
      }
    ],
    name: 'GovernorCreated',
    type: 'event'
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governorAddress',
        type: 'address'
      },
      {
        internalType: 'enum DGP.ProposalType',
        name: 'proposalType',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'proposalAddress',
        type: 'address'
      }
    ],
    name: 'addProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'createGovernor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'g',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'gmrx',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'governance',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mns',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mrx',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governorAddress',
        type: 'address'
      }
    ],
    name: 'ping',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pool',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governorAddress',
        type: 'address'
      },
      { internalType: 'string', name: 'title', type: 'string' },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      { internalType: 'string', name: 'url', type: 'string' },
      {
        internalType: 'uint256',
        name: 'requested',
        type: 'uint256'
      },
      { internalType: 'uint8', name: 'duration', type: 'uint8' }
    ],
    name: 'startProposal',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governorAddress',
        type: 'address'
      },
      { internalType: 'bool', name: '', type: 'bool' }
    ],
    name: 'unenroll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governorAddress',
        type: 'address'
      },
      {
        internalType: 'uint8',
        name: 'proposalId',
        type: 'uint8'
      },
      {
        internalType: 'enum Budget.Vote',
        name: 'vote',
        type: 'uint8'
      }
    ],
    name: 'voteForProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
];
