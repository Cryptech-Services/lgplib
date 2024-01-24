export const Governance = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_dgpAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
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
    name: 'budgetAddress',
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
    name: 'currentWinner',
    outputs: [{ internalType: 'address', name: 'winner', type: 'address' }],
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
    name: 'enroll',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getGovernorsAddresses',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'governorCount',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'governors',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockHeight',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastPing',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastReward',
        type: 'uint256'
      },
      {
        internalType: 'uint16',
        name: 'addressIndex',
        type: 'uint16'
      }
    ],
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
      { internalType: 'bool', name: 'checkPing', type: 'bool' },
      { internalType: 'bool', name: 'checkCanVote', type: 'bool' }
    ],
    name: 'isValidGovernor',
    outputs: [{ internalType: 'bool', name: 'valid', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'governor',
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
    name: 'ping',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'removeInactiveGovernor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'winner', type: 'address' }],
    name: 'rewardGovernor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bool', name: 'force', type: 'bool' }],
    name: 'unenroll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
