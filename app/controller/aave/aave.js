// import express from 'express';
// require ('../../utils/helper');
const init_ethers = require('../../utils/helper');


// import ethcall from "ethcall";

const A_TOKEN_ABI = [
  {
    inputs: [
      {internalType: 'contract ILendingPool', name: 'pool', type: 'address'},
      {internalType: 'address', name: 'underlyingAssetAddress', type: 'address'},
      {internalType: 'address', name: 'reserveTreasuryAddress', type: 'address'},
      {internalType: 'string', name: 'tokenName', type: 'string'},
      {internalType: 'string', name: 'tokenSymbol', type: 'string'},
      {internalType: 'address', name: 'incentivesController', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'spender', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'BalanceTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'target', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ATOKEN_REVISION',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EIP712_REVISION',
    outputs: [{internalType: 'bytes', name: '', type: 'bytes'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'POOL',
    outputs: [{internalType: 'contract ILendingPool', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'RESERVE_TREASURY_ADDRESS',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UINT_MAX_VALUE',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNDERLYING_ASSET_ADDRESS',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: '_nonces',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: 'receiverOfUnderlying', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
    ],
    name: 'decreaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getScaledUserBalanceAndSupply',
    outputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'uint256', name: '', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
    ],
    name: 'increaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint8', name: 'underlyingAssetDecimals', type: 'uint8'},
      {internalType: 'string', name: 'tokenName', type: 'string'},
      {internalType: 'string', name: 'tokenSymbol', type: 'string'},
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'mint',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'mintToTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'scaledBalanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'scaledTotalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'sender', type: 'address'},
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'transferOnLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'target', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transferUnderlyingTo',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const B_TOKEN_ABI = [
  {
    inputs: [
      {internalType: 'address', name: 'pool', type: 'address'},
      {internalType: 'address', name: 'underlyingAsset', type: 'address'},
      {internalType: 'string', name: 'name', type: 'string'},
      {internalType: 'string', name: 'symbol', type: 'string'},
      {internalType: 'address', name: 'incentivesController', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'spender', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'fromUser', type: 'address'},
      {indexed: true, internalType: 'address', name: 'toUser', type: 'address'},
      {indexed: false, internalType: 'address', name: 'asset', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'BorrowAllowanceDelegated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'underlyingAsset', type: 'address'},
      {indexed: true, internalType: 'address', name: 'pool', type: 'address'},
      {indexed: false, internalType: 'address', name: 'incentivesController', type: 'address'},
      {indexed: false, internalType: 'uint8', name: 'debtTokenDecimals', type: 'uint8'},
      {indexed: false, internalType: 'string', name: 'debtTokenName', type: 'string'},
      {indexed: false, internalType: 'string', name: 'debtTokenSymbol', type: 'string'},
      {indexed: false, internalType: 'bytes', name: 'params', type: 'bytes'},
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEBT_TOKEN_REVISION',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'POOL',
    outputs: [{internalType: 'contract ILendingPool', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNDERLYING_ASSET_ADDRESS',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'delegatee', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'approveDelegation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'fromUser', type: 'address'},
      {internalType: 'address', name: 'toUser', type: 'address'},
    ],
    name: 'borrowAllowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
    ],
    name: 'decreaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getIncentivesController',
    outputs: [{internalType: 'contract IAaveIncentivesController', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getScaledUserBalanceAndSupply',
    outputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'uint256', name: '', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
    ],
    name: 'increaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint8', name: 'decimals', type: 'uint8'},
      {internalType: 'string', name: 'name', type: 'string'},
      {internalType: 'string', name: 'symbol', type: 'string'},
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'mint',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'scaledBalanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'scaledTotalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'sender', type: 'address'},
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const LENDING_ABI = [
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: false, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'borrowRateMode', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'borrowRate', type: 'uint256'},
      {indexed: true, internalType: 'uint16', name: 'referral', type: 'uint16'},
    ],
    name: 'Borrow',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: false, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
      {indexed: true, internalType: 'uint16', name: 'referral', type: 'uint16'},
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'target', type: 'address'},
      {indexed: true, internalType: 'address', name: 'initiator', type: 'address'},
      {indexed: true, internalType: 'address', name: 'asset', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'premium', type: 'uint256'},
      {indexed: false, internalType: 'uint16', name: 'referralCode', type: 'uint16'},
    ],
    name: 'FlashLoan',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'collateralAsset', type: 'address'},
      {indexed: true, internalType: 'address', name: 'debtAsset', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'debtToCover', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'liquidatedCollateralAmount', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'liquidator', type: 'address'},
      {indexed: false, internalType: 'bool', name: 'receiveAToken', type: 'bool'},
    ],
    name: 'LiquidationCall',
    type: 'event',
  },
  {anonymous: false, inputs: [], name: 'Paused', type: 'event'},
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
    ],
    name: 'RebalanceStableBorrowRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'repayer', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Repay',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'liquidityRate', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'stableBorrowRate', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'variableBorrowRate', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'liquidityIndex', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'variableBorrowIndex', type: 'uint256'},
    ],
    name: 'ReserveDataUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
    ],
    name: 'ReserveUsedAsCollateralDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
    ],
    name: 'ReserveUsedAsCollateralEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'rateMode', type: 'uint256'},
    ],
    name: 'Swap',
    type: 'event',
  },
  {anonymous: false, inputs: [], name: 'Unpaused', type: 'event'},
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'reserve', type: 'address'},
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'FLASHLOAN_PREMIUM_TOTAL',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LENDINGPOOL_REVISION',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_NUMBER_RESERVES',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_STABLE_RATE_BORROW_SIZE_PERCENT',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'interestRateMode', type: 'uint256'},
      {internalType: 'uint16', name: 'referralCode', type: 'uint16'},
      {internalType: 'address', name: 'onBehalfOf', type: 'address'},
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {internalType: 'uint16', name: 'referralCode', type: 'uint16'},
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'balanceFromBefore', type: 'uint256'},
      {internalType: 'uint256', name: 'balanceToBefore', type: 'uint256'},
    ],
    name: 'finalizeTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'receiverAddress', type: 'address'},
      {internalType: 'address[]', name: 'assets', type: 'address[]'},
      {internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'},
      {internalType: 'uint256[]', name: 'modes', type: 'uint256[]'},
      {internalType: 'address', name: 'onBehalfOf', type: 'address'},
      {internalType: 'bytes', name: 'params', type: 'bytes'},
      {internalType: 'uint16', name: 'referralCode', type: 'uint16'},
    ],
    name: 'flashLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAddressesProvider',
    outputs: [{internalType: 'contract ILendingPoolAddressesProvider', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'asset', type: 'address'}],
    name: 'getConfiguration',
    outputs: [
      {
        components: [{internalType: 'uint256', name: 'data', type: 'uint256'}],
        internalType: 'struct DataTypes.ReserveConfigurationMap',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'asset', type: 'address'}],
    name: 'getReserveData',
    outputs: [
      {
        components: [
          {
            components: [{internalType: 'uint256', name: 'data', type: 'uint256'}],
            internalType: 'struct DataTypes.ReserveConfigurationMap',
            name: 'configuration',
            type: 'tuple',
          },
          {internalType: 'uint128', name: 'liquidityIndex', type: 'uint128'},
          {internalType: 'uint128', name: 'variableBorrowIndex', type: 'uint128'},
          {internalType: 'uint128', name: 'currentLiquidityRate', type: 'uint128'},
          {internalType: 'uint128', name: 'currentVariableBorrowRate', type: 'uint128'},
          {internalType: 'uint128', name: 'currentStableBorrowRate', type: 'uint128'},
          {internalType: 'uint40', name: 'lastUpdateTimestamp', type: 'uint40'},
          {internalType: 'address', name: 'aTokenAddress', type: 'address'},
          {internalType: 'address', name: 'stableDebtTokenAddress', type: 'address'},
          {internalType: 'address', name: 'variableDebtTokenAddress', type: 'address'},
          {internalType: 'address', name: 'interestRateStrategyAddress', type: 'address'},
          {internalType: 'uint8', name: 'id', type: 'uint8'},
        ],
        internalType: 'struct DataTypes.ReserveData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'asset', type: 'address'}],
    name: 'getReserveNormalizedIncome',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'asset', type: 'address'}],
    name: 'getReserveNormalizedVariableDebt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getReservesList',
    outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getUserAccountData',
    outputs: [
      {internalType: 'uint256', name: 'totalCollateralETH', type: 'uint256'},
      {internalType: 'uint256', name: 'totalDebtETH', type: 'uint256'},
      {internalType: 'uint256', name: 'availableBorrowsETH', type: 'uint256'},
      {internalType: 'uint256', name: 'currentLiquidationThreshold', type: 'uint256'},
      {internalType: 'uint256', name: 'ltv', type: 'uint256'},
      {internalType: 'uint256', name: 'healthFactor', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getUserConfiguration',
    outputs: [
      {
        components: [{internalType: 'uint256', name: 'data', type: 'uint256'}],
        internalType: 'struct DataTypes.UserConfigurationMap',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'address', name: 'aTokenAddress', type: 'address'},
      {internalType: 'address', name: 'stableDebtAddress', type: 'address'},
      {internalType: 'address', name: 'variableDebtAddress', type: 'address'},
      {internalType: 'address', name: 'interestRateStrategyAddress', type: 'address'},
    ],
    name: 'initReserve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'contract ILendingPoolAddressesProvider', name: 'provider', type: 'address'}],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'collateralAsset', type: 'address'},
      {internalType: 'address', name: 'debtAsset', type: 'address'},
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'uint256', name: 'debtToCover', type: 'uint256'},
      {internalType: 'bool', name: 'receiveAToken', type: 'bool'},
    ],
    name: 'liquidationCall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'address', name: 'user', type: 'address'},
    ],
    name: 'rebalanceStableBorrowRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'rateMode', type: 'uint256'},
      {internalType: 'address', name: 'onBehalfOf', type: 'address'},
    ],
    name: 'repay',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'configuration', type: 'uint256'},
    ],
    name: 'setConfiguration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bool', name: 'val', type: 'bool'}],
    name: 'setPause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'address', name: 'rateStrategyAddress', type: 'address'},
    ],
    name: 'setReserveInterestRateStrategyAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'bool', name: 'useAsCollateral', type: 'bool'},
    ],
    name: 'setUserUseReserveAsCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'rateMode', type: 'uint256'},
    ],
    name: 'swapBorrowRateMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'asset', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'withdraw',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const ASSET_ABI = [
  {
    inputs: [
      {internalType: 'contract IStakedTokenWithConfig', name: 'stakeToken', type: 'address'},
      {internalType: 'address', name: 'emissionManager', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'asset', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'emission', type: 'uint256'},
    ],
    name: 'AssetConfigUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'asset', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'AssetIndexUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'claimer', type: 'address'},
    ],
    name: 'ClaimerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: 'newDistributionEnd', type: 'uint256'}],
    name: 'DistributionEndUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'RewardsAccrued',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: true, internalType: 'address', name: 'claimer', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'RewardsClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'asset', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'UserIndexUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DISTRIBUTION_END',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'EMISSION_MANAGER',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PRECISION',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REVISION',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REWARD_TOKEN',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'STAKE_TOKEN',
    outputs: [{internalType: 'contract IStakedTokenWithConfig', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'assets',
    outputs: [
      {internalType: 'uint104', name: 'emissionPerSecond', type: 'uint104'},
      {internalType: 'uint104', name: 'index', type: 'uint104'},
      {internalType: 'uint40', name: 'lastUpdateTimestamp', type: 'uint40'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'assets', type: 'address[]'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'claimRewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'assets', type: 'address[]'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'claimRewardsOnBehalf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'assets', type: 'address[]'},
      {internalType: 'uint256[]', name: 'emissionsPerSecond', type: 'uint256[]'},
    ],
    name: 'configureAssets',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'asset', type: 'address'}],
    name: 'getAssetData',
    outputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'uint256', name: '', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getClaimer',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDistributionEnd',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'assets', type: 'address[]'},
      {internalType: 'address', name: 'user', type: 'address'},
    ],
    name: 'getRewardsBalance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: 'asset', type: 'address'},
    ],
    name: 'getUserAssetData',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_user', type: 'address'}],
    name: 'getUserUnclaimedRewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'uint256', name: 'totalSupply', type: 'uint256'},
      {internalType: 'uint256', name: 'userBalance', type: 'uint256'},
    ],
    name: 'handleAction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'addressesProvider', type: 'address'}],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: 'caller', type: 'address'},
    ],
    name: 'setClaimer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'distributionEnd', type: 'uint256'}],
    name: 'setDistributionEnd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const ATokenAddresses = [
  '0xFFC97d72E13E01096502Cb8Eb52dEe56f74DAD7B', //AAVE
  '0x272F97b7a56a387aE942350bBC7Df5700f8a4576', //BAL
  '0x05Ec93c0365baAeAbF7AefFb0972ea7ECdD39CF1', //BAT
  '0xA361718326c15715591c299427c62086F69923D9', //BUSD
  '0x8dAE6Cb04688C62d939ed9B68d32Bc62e49970b1', //CRV
  '0x028171bCA77440897B824Ca71D1c56caC55b68A3', //DAI
  '0xaC6Df26a590F08dcC95D5a4705ae8abbc88509Ef', //ENJ
  '0xD37EE7e4f452C6638c96536e68090De8cBcdb583', //GUSD
  '0x39C6b3e42d6A679d7D776778Fe880BC9487C2EDA', //KNC
  '0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0', //LINK
  '0xa685a61171bb30d4072B338c80Cb7b2c865c873E', //MANA
  '0xc713e5E149D5D0715DcD1c156a020976e7E56B88', //MKR
  '0xCC12AbE4ff81c9378D670De1b57F8e0Dd228D77a', //REN
  '0x35f6B052C598d933D69A4EEC4D04c73A191fE6c2', //SNX
  '0x6C5024Cd4F8A59110119C56f8933403A539555EB', //SUSD
  '0x101cc05f4A51C0319f570d5E146a8C625198e636', //TUSD
  '0xB9D7CB55f463405CDfBe4E90a6D2Df01C2B92BF1', //UNI
  '0xBcca60bB61934080951369a648Fb03DF4F96263C', //USDC
  '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811', //USDT
  '0x9ff58f4fFB29fA2266Ab25e75e2A8b3503311656', //WBTC
  '0x030bA81f1c18d280636F32af80b9AAd02Cf0854e', //WETH
  '0xF256CC7847E919FAc9B808cC216cAc87CCF2f47a', //XSUSHI
  '0x5165d24277cD063F5ac44Efd447B27025e888f37', //YFI
  '0xDf7FF54aAcAcbFf42dfe29DD6144A69b629f8C9e', //ZRX
]

const BTokenAddresses = [
  '0xF7DBA49d571745D9d7fcb56225B05BEA803EBf3C', //AAVE
  '0x13210D4Fe0d5402bd7Ecbc4B5bC5cFcA3b71adB0', //BAL
  '0xfc218A6Dfe6901CB34B1a5281FC6f1b8e7E56877', //BAT
  '0xbA429f7011c9fa04cDd46a2Da24dc0FF0aC6099c', //BUSD
  '0x00ad8eBF64F141f1C81e9f8f792d3d1631c6c684', //CRV
  '0x6C3c78838c761c6Ac7bE9F59fe808ea2A6E4379d', //DAI
  '0x38995F292a6E31b78203254fE1cdd5Ca1010A446', //ENJ
  '0x279AF5b99540c1A3A7E3CDd326e19659401eF99e', //GUSD
  '0x6B05D1c608015Ccb8e205A690cB86773A96F39f1', //KNC
  '0x0b8f12b1788BFdE65Aa1ca52E3e9F3Ba401be16D', //LINK
  '0x0A68976301e46Ca6Ce7410DB28883E309EA0D352', //MANA
  '0xba728eAd5e496BE00DCF66F650b6d7758eCB50f8', //MKR
  '0xcd9D82d33bd737De215cDac57FE2F7f04DF77FE0', //REN
  '0x267EB8Cf715455517F9BD5834AeAE3CeA1EBdbD8', //SNX
  '0xdC6a3Ab17299D9C2A412B0e0a4C1f55446AE0817', //SUSD
  '0x01C0eb1f8c6F1C1bF74ae028697ce7AA2a8b0E92', //TUSD
  '0x5BdB050A92CADcCfCDcCCBFC17204a1C9cC0Ab73', //UNI
  '0x619beb58998eD2278e08620f97007e1116D5D25b', //USDC
  '0x531842cEbbdD378f8ee36D171d6cC9C4fcf475Ec', //USDT
  '0x9c39809Dec7F95F5e0713634a4D0701329B3b4d2', //WBTC
  '0xF63B34710400CAd3e044cFfDcAb00a0f32E33eCf', //WETH
  '0xfAFEDF95E21184E3d880bd56D4806c4b8d31c69A', //XSUSHI
  '0x7EbD09022Be45AD993BAA1CEc61166Fcc8644d97', //YFI
  '0x85791D117A392097590bDeD3bD5abB8d5A20491A', //ZRX
]

async function main() {
  const App = await init_ethers()
  print("________________")
  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  let prices = {}
  let tokens = {}

  const LENDING_CONTRACT_ADDR = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'
  const ASSET_CONTRACT_ADDR = '0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5'

  const data = await Promise.all(
    [...Array(ATokenAddresses.length).keys()].map(x =>
      loadAaveData(
        App,
        ATokenAddresses[x],
        BTokenAddresses[x],
        LENDING_CONTRACT_ADDR,
        ASSET_CONTRACT_ADDR,
        A_TOKEN_ABI,
        B_TOKEN_ABI,
        LENDING_ABI,
        ASSET_ABI,
        tokens,
        prices
      )
    )
  )

  for (const pool of data) {
    printAaveData(pool)
  }

  hideLoading()
}



async function loadAaveData(
  App,
  aTokenAddress,
  bTokenAddress,
  lendingAddress,
  assetAddress,
  aTokenAbi,
  bTokenAbi,
  lendingAbi,
  assetAbi,
  tokens,
  prices
) {
  const ATOKEN_CONTRACT = new ethcall.Contract(aTokenAddress, aTokenAbi)
  const BTOKEN_CONTRACT = new ethcall.Contract(bTokenAddress, bTokenAbi)
  const [
    underlyingTokenAddress,
    aDecimals,
    aTotalSupply_,
    aBalanceOf_,
    bDecimals,
    bTotalSupply_,
    bBalanceOf_,
  ] = await App.ethcallProvider.all([
    ATOKEN_CONTRACT.UNDERLYING_ASSET_ADDRESS(),
    ATOKEN_CONTRACT.decimals(),
    ATOKEN_CONTRACT.totalSupply(),
    ATOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
    BTOKEN_CONTRACT.decimals(),
    BTOKEN_CONTRACT.totalSupply(),
    BTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
  ])
  await getNewPricesAndTokens(App, tokens, prices, [underlyingTokenAddress], underlyingTokenAddress)
  const UNDERLYING_CONTRACT = new ethcall.Contract(underlyingTokenAddress, aTokenAbi)
  const ASSET_CONTRACT = new ethcall.Contract(assetAddress, assetAbi)
  const LENDING_CONTRACT = new ethcall.Contract(lendingAddress, lendingAbi)
  const [assetDataSupply, assetDataBorrow, lendingData, uDecimals, uReserves_] = await App.ethcallProvider.all([
    ASSET_CONTRACT.assets(aTokenAddress),
    ASSET_CONTRACT.assets(bTokenAddress),
    LENDING_CONTRACT.getReserveData(underlyingTokenAddress),
    UNDERLYING_CONTRACT.decimals(),
    UNDERLYING_CONTRACT.balanceOf(aTokenAddress),
  ])
  let uSymbol = ''
  if (underlyingTokenAddress == '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2') {
    uSymbol = 'MKR'
  } else {
    ;[uSymbol] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.symbol()])
  }
  const uReserves = uReserves_ / 10 ** uDecimals
  const aTotalSupply = aTotalSupply_ / 10 ** aDecimals
  const aBalanceOf = aBalanceOf_ / 10 ** aDecimals
  const aPct = (aBalanceOf / aTotalSupply) * 100
  const bTotalSupply = bTotalSupply_ / 10 ** bDecimals
  const bBalanceOf = bBalanceOf_ / 10 ** bDecimals
  const bPct = (bBalanceOf / bTotalSupply) * 100
  const underlyingPrice = getParameterCaseInsensitive(prices, underlyingTokenAddress)?.usd
  const rewardTokenPrice = getParameterCaseInsensitive(prices, '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9')?.usd
  const supplyRate = (lendingData.currentLiquidityRate / 1e27) * 100
  const borrowRate = (lendingData.currentVariableBorrowRate / 1e27) * 100
  const rewardsSupplyPerWeek = (assetDataSupply.emissionPerSecond / 1e18) * 604800
  const rewardsBorrowPerWeek = (assetDataBorrow.emissionPerSecond / 1e18) * 604800
  const usdPerSupplyWeek = rewardsSupplyPerWeek * rewardTokenPrice
  const usdPerBorrowWeek = rewardsBorrowPerWeek * rewardTokenPrice
  const supplyWeeklyAPR = (usdPerSupplyWeek / (aTotalSupply * underlyingPrice)) * 100
  const borrowWeeklyAPR = (usdPerBorrowWeek / (bTotalSupply * underlyingPrice)) * 100
  const yearlySupplyAPR = supplyWeeklyAPR * 52
  const yearlyBorrowAPR = borrowWeeklyAPR * 52
  const supplyNetAPR = supplyRate + yearlySupplyAPR
  const borrowNetAPR = yearlyBorrowAPR - borrowRate
  const aUsdPerYear = (aBalanceOf * underlyingPrice * supplyNetAPR) / 100
  const aUsdPerWeek = aUsdPerYear / 52
  const aUsdPerDay = aUsdPerYear / 365
  const bUsdPerYear = (bBalanceOf * underlyingPrice * borrowNetAPR) / 100
  const bUsdPerWeek = bUsdPerYear / 52
  const bUsdPerDay = bUsdPerYear / 365
  return {
    uSymbol,
    underlyingPrice,
    aTotalSupply,
    bTotalSupply,
    uReserves,
    yearlySupplyAPR,
    yearlyBorrowAPR,
    supplyNetAPR,
    borrowNetAPR,
    aBalanceOf,
    aUsdPerDay,
    aUsdPerWeek,
    aUsdPerYear,
    bBalanceOf,
    bUsdPerDay,
    bUsdPerWeek,
    bUsdPerYear,
    supplyRate,
    borrowRate,
    aPct,
    bPct,
  }
}


async function printAaveData(data) {
  _print_bold(`${data.uSymbol} ($${formatMoney(data.underlyingPrice)})`)
  _print(
    `Supplied : ${formatMoney(data.aTotalSupply)} ($${formatMoney(
      data.aTotalSupply * data.underlyingPrice
    )}) at ${data.supplyRate.toFixed(2)}% APR`
  )
  _print(
    `Borrowed : ${formatMoney(data.bTotalSupply)} ($${formatMoney(
      data.bTotalSupply * data.underlyingPrice
    )}) at ${data.borrowRate.toFixed(2)}% APR`
  )
  _print(`Reserves : ${formatMoney(data.uReserves)} ($${formatMoney(data.uReserves * data.underlyingPrice)})`)
  _print(`Farming APR Supply ${data.yearlySupplyAPR.toFixed(2)}% Borrow ${data.yearlyBorrowAPR.toFixed(2)}%`)
  _print(`Net APR Supply ${data.supplyNetAPR.toFixed(2)}% Borrow ${data.borrowNetAPR.toFixed(2)}%`)
  if (data.aBalanceOf > 0) {
    _print(
      `You are supplying ${formatMoney(data.aBalanceOf)} ${data.uSymbol} ($${formatMoney(
        data.aBalanceOf * data.underlyingPrice
      )}), ${data.aPct.toFixed(2)}% of the pool.`
    )
    _print(
      `Estimated Supply earnings: Day ($${formatMoney(data.aUsdPerDay)}) Week ($${formatMoney(
        data.aUsdPerWeek
      )}) Year: ($${formatMoney(data.aUsdPerYear)})`
    )
  }
  if (data.bBalanceOf > 0) {
    _print(
      `You are borrowing ${formatMoney(data.bBalanceOf)} ${data.uSymbol} ($${formatMoney(
        data.bBalanceOf * data.underlyingPrice
      )}), ${data.bPct.toFixed(2)}% of the pool.`
    )
    _print(
      `Estimated Borrow earnings: Day ($${formatMoney(data.bUsdPerDay)}) Week ($${formatMoney(
        data.bUsdPerWeek
      )}) Year: ($${formatMoney(data.bUsdPerYear)})`
    )
  }
  _print('')
}

module.exports = main;






