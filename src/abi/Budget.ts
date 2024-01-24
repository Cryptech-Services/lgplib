export const Budget = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_dgpAddress',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '_governanceAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'id',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'desc',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'url',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'requested',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'duration',
        type: 'uint8'
      }
    ],
    name: 'ProposalStarted',
    type: 'event'
  },
  {
    inputs: [],
    name: 'balance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'dgpAddress',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: 'proposalId', type: 'uint8' }],
    name: 'getProposalIndex',
    outputs: [{ internalType: 'int16', name: '', type: 'int16' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'governanceAddress',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'proposalCount',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: 'proposalId', type: 'uint8' }],
    name: 'proposalVoteStatus',
    outputs: [
      {
        internalType: 'enum Budget.Vote',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'proposals',
    outputs: [
      { internalType: 'uint8', name: 'id', type: 'uint8' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'string', name: 'desc', type: 'string' },
      { internalType: 'string', name: 'url', type: 'string' },
      {
        internalType: 'uint256',
        name: 'requested',
        type: 'uint256'
      },
      { internalType: 'uint8', name: 'duration', type: 'uint8' },
      {
        internalType: 'uint8',
        name: 'durationsPaid',
        type: 'uint8'
      },
      { internalType: 'uint16', name: 'yesVote', type: 'uint16' },
      { internalType: 'uint16', name: 'noVote', type: 'uint16' },
      { internalType: 'bool', name: 'remove', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'settleBudget',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
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
  }
];
