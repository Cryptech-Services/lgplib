export const Pool = [
  {
    inputs: [
      { internalType: 'address', name: '_mrx', type: 'address' },
      { internalType: 'address', name: '_gmrx', type: 'address' },
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
        indexed: false,
        internalType: 'uint256',
        name: 'amountMRX',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountGMRX',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLP',
        type: 'uint256'
      }
    ],
    name: 'AddLiquidity',
    type: 'event'
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
        indexed: false,
        internalType: 'uint256',
        name: 'burnAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'releaseAmount',
        type: 'uint256'
      }
    ],
    name: 'BurnAndRelease',
    type: 'event'
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
        indexed: false,
        internalType: 'uint256',
        name: 'amountMRX',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountGMRX',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountLP',
        type: 'uint256'
      }
    ],
    name: 'RemoveLiquidity',
    type: 'event'
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
        indexed: false,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountFrom',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountTo',
        type: 'uint256'
      }
    ],
    name: 'Swap',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountMRX',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountGMRX',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'allowHighSlippage',
        type: 'bool'
      }
    ],
    name: 'addLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountGMRX',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'allowHighSlippage',
        type: 'bool'
      }
    ],
    name: 'addLiquidity',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountGMRX',
        type: 'uint256'
      },
      { internalType: 'bool', name: 'unwrapMRX', type: 'bool' }
    ],
    name: 'burnAndRelease',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'lp',
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
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256'
      }
    ],
    name: 'quote',
    outputs: [
      {
        internalType: 'uint256',
        name: 'swapQuote',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lpAmount',
        type: 'uint256'
      },
      { internalType: 'bool', name: 'unwrapMRX', type: 'bool' }
    ],
    name: 'removeLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'reserves',
    outputs: [
      {
        internalType: 'uint256',
        name: 'mrxReserve',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'gmrxReserve',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint16', name: 'slippage', type: 'uint16' }],
    name: 'swapTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint16', name: 'slippage', type: 'uint16' }
    ],
    name: 'swapTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
