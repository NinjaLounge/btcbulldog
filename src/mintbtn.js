import React, { useState, useEffect } from 'react'
import abi from './abi.json'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
require('dotenv').config()



const {
  REACT_APP_CONTRACT_ADDRESS,
  REACT_APP_MINT_PRICE,
  REACT_APP_MINT_PRICE_AFTER_2K,
} = process.env
const SELECTEDNETWORK = '1'
const SELECTEDNETWORKNAME = ' ETHEREUM MAINNET'
const nftquantity = 10

function Mintbtn() {
  const [loading, setLoading] = useState(false);
  const [mintedNft, setMintedNft] = useState(0); 
  const [totalMintedNft, setTotalMintedNft] = useState(0); 
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [errormsg, setErrorMsg] = useState(false)
  const [hideMinting, setHideMinting] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [totalSupply, settotalSupply] = useState(0)

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis()

  const login = async () => {
    console.log('isAuthenticated :: ', isAuthenticated)
    if (!isAuthenticated) {
      await authenticate({ signingMessage: 'Log-in BTCBULLDOG' })
        .then(function (user) {
          if (user) {
            toast.success('Wallet connected successfully')
          }
          console.log('logged in user:', user)
          console.log(user.get('ethAddress'))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const logOut = async () => {
    await logout()
    toast.success('Logout successfully')
    console.log('logged out')
  }

  const getProvider = () => {
    //  const { provider } = store.getState();
    let newProvider = null
    try {
      if (!window.ethereum) throw new Error('Wallet not found')
      //   if (window.ethereum?.providers) {
      //     newProvider =
      //       window.ethereum.providers &&
      //       window.ethereum.providers.find((provider) => provider.isMetaMask);
      //   }
      if (
        window.ethereum?.isCoinbaseWallet ||
        window.ethereum?.overrideIsMetaMask
      )
        newProvider = window.ethereum.providers.find(
          (provider) => provider.isMetaMask,
        )
      else newProvider = window.ethereum
      return newProvider
    } catch (err) {
      console.log(err, 'ERROR_Wallet')
      //   store.dispatch(
      //     alert({
      //       title: "",
      //       message: err.message || "Window.ethereum not found or provider missed",
      //       severity: "error",
      //       show: true,
      //     })
      //   );
    }
  }


  async function MintNFT() {
    var abi = [
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'uint256', name: 'mintPrice', type: 'uint256' },
          { internalType: 'address', name: 'admin', type: 'address' },
          { internalType: 'uint256', name: 'max', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'previousAdminRole',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'newAdminRole',
            type: 'bytes32',
          },
        ],
        name: 'RoleAdminChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleGranted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleRevoked',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'NftCreator',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'string', name: 'URI', type: 'string' }],
        name: 'SetcontractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: '_contractMeta',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_distributorFee',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_feeReciever',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_tokenIdTracker',
        outputs: [
          { internalType: 'uint256', name: '_value', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'TokenToAdd', type: 'address' },
          { internalType: 'uint256', name: 'percent', type: 'uint256' },
        ],
        name: 'addTokenToBuy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'wallet', type: 'address' },
          { internalType: 'uint256', name: 'percent', type: 'uint256' },
        ],
        name: 'addWalletToBuy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'artistFeeReciever',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'artistPercent',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'canMint',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimRewards',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimRewardsInToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claimTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'creator',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'currentRate',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'devFeeReciever',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address[]', name: 'Adds', type: 'address[]' },
        ],
        name: 'excludeFromrewardMultiple',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'excludedFromRewards',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'getApproved',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getMaxSupply',
        outputs: [{ internalType: 'uint256', name: 'max', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getMintPrice',
        outputs: [
          { internalType: 'uint256', name: 'mintPrice', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getMinted',
        outputs: [
          { internalType: 'uint256', name: 'minted', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'getReflectionBalance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getReflectionBalances',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
        name: 'getRoleAdmin',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'getRoleMember',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
        name: 'getRoleMemberCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getServiceFee',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getStoragePrice',
        outputs: [
          { internalType: 'uint256', name: 'storagePrice', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
          { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
          { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'hasRole',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isAutostaking',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'marketingReciever',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'maxSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'quantity', type: 'uint256' },
        ],
        name: 'mintMany',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'recipients',
            type: 'address[]',
          },
        ],
        name: 'mintMultiples',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'mintPercentage',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'contract IBEP20', name: 'token', type: 'address' },
        ],
        name: 'recoverStuckToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'reflectPercent',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'reflectionBalance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'TokenToRemove', type: 'address' },
        ],
        name: 'removeTokenToBuy',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'ToRemove', type: 'address' },
        ],
        name: 'removeWalletToBuy',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
          { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes32', name: 'role', type: 'bytes32' },
          { internalType: 'address', name: 'account', type: 'address' },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'router',
        outputs: [
          { internalType: 'contract IDEXRouter', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'bytes', name: '_data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'newAdmin', type: 'address' },
        ],
        name: 'setAdditionalAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'operator', type: 'address' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'receiver', type: 'address' },
        ],
        name: 'setArtistFeeReciever',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'string', name: 'baseURI', type: 'string' }],
        name: 'setBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'reciever', type: 'address' },
        ],
        name: 'setFeeReciever',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'receiver', type: 'address' },
        ],
        name: 'setMarketingFeeReciever',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'bool', name: 'Allowed', type: 'bool' }],
        name: 'setMintingEnabled',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
        ],
        name: 'setReflectPercent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'string', name: '_tokenURI', type: 'string' },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' },
        ],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'tokensToBuy',
        outputs: [
          { internalType: 'address', name: 'buyableToken', type: 'address' },
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalCollected',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalDividend',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalReflectionVolume',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalrewards',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'walletsToSend',
        outputs: [
          { internalType: 'address', name: 'walletAddress', type: 'address' },
          { internalType: 'uint256', name: 'percentage', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      { stateMutability: 'payable', type: 'receive' },
    ];


    var contractaddress = '0x337156242FA1FC88C4C5c39Ff4d875EAAD9b10Df'
   
    //  const web3 = window.web3
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()

  
    console.log('Sender :  ' + accounts[0])

    const instance =  new web3.eth.Contract(abi, contractaddress)

    await instance.methods
      .mintMany(quantity)
      .send({
        from: accounts[0],
        value :  50000000000000000 * quantity
      })
  }

  useEffect(async () => {



    async function GetData() {
      var abi = [
        {
          inputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' },
            { internalType: 'uint256', name: 'mintPrice', type: 'uint256' },
            { internalType: 'address', name: 'admin', type: 'address' },
            { internalType: 'uint256', name: 'max', type: 'uint256' },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'approved',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'previousAdminRole',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'newAdminRole',
              type: 'bytes32',
            },
          ],
          name: 'RoleAdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleGranted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'role',
              type: 'bytes32',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          name: 'RoleRevoked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          inputs: [],
          name: 'DEFAULT_ADMIN_ROLE',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'NftCreator',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'string', name: 'URI', type: 'string' }],
          name: 'SetcontractURI',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: '_contractMeta',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_distributorFee',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_feeReciever',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_tokenIdTracker',
          outputs: [
            { internalType: 'uint256', name: '_value', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'TokenToAdd', type: 'address' },
            { internalType: 'uint256', name: 'percent', type: 'uint256' },
          ],
          name: 'addTokenToBuy',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'wallet', type: 'address' },
            { internalType: 'uint256', name: 'percent', type: 'uint256' },
          ],
          name: 'addWalletToBuy',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'artistFeeReciever',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'artistPercent',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'canMint',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimRewards',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimRewardsInToken',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'contractURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'creator',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'currentRate',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'deposit',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'devFeeReciever',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address[]', name: 'Adds', type: 'address[]' },
          ],
          name: 'excludeFromrewardMultiple',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: '', type: 'address' }],
          name: 'excludedFromRewards',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'getApproved',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getMaxSupply',
          outputs: [{ internalType: 'uint256', name: 'max', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getMintPrice',
          outputs: [
            { internalType: 'uint256', name: 'mintPrice', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getMinted',
          outputs: [
            { internalType: 'uint256', name: 'minted', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'getReflectionBalance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getReflectionBalances',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleAdmin',
          outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'getRoleMember',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
          name: 'getRoleMemberCount',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getServiceFee',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getStoragePrice',
          outputs: [
            { internalType: 'uint256', name: 'storagePrice', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'grantRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'hasRole',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' },
          ],
          name: 'isApprovedForAll',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'isAutostaking',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'marketingReciever',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'maxSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'mint',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'quantity', type: 'uint256' },
          ],
          name: 'mintMany',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address[]',
              name: 'recipients',
              type: 'address[]',
            },
          ],
          name: 'mintMultiples',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'mintPercentage',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'ownerOf',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'contract IBEP20', name: 'token', type: 'address' },
          ],
          name: 'recoverStuckToken',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'reflectPercent',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'reflectionBalance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'TokenToRemove', type: 'address' },
          ],
          name: 'removeTokenToBuy',
          outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'ToRemove', type: 'address' },
          ],
          name: 'removeWalletToBuy',
          outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'renounceRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' },
          ],
          name: 'revokeRole',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'router',
          outputs: [
            { internalType: 'contract IDEXRouter', name: '', type: 'address' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bytes', name: '_data', type: 'bytes' },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'newAdmin', type: 'address' },
          ],
          name: 'setAdditionalAdmin',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'bool', name: 'approved', type: 'bool' },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'receiver', type: 'address' },
          ],
          name: 'setArtistFeeReciever',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'string', name: 'baseURI', type: 'string' }],
          name: 'setBaseURI',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'reciever', type: 'address' },
          ],
          name: 'setFeeReciever',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'receiver', type: 'address' },
          ],
          name: 'setMarketingFeeReciever',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'bool', name: 'Allowed', type: 'bool' }],
          name: 'setMintingEnabled',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          ],
          name: 'setReflectPercent',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'string', name: '_tokenURI', type: 'string' },
          ],
          name: 'setTokenURI',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' },
          ],
          name: 'supportsInterface',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
          name: 'tokenByIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint256', name: 'index', type: 'uint256' },
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'tokenURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'tokensToBuy',
          outputs: [
            { internalType: 'address', name: 'buyableToken', type: 'address' },
            { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalCollected',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalDividend',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalReflectionVolume',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalrewards',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          ],
          name: 'transferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          name: 'walletsToSend',
          outputs: [
            { internalType: 'address', name: 'walletAddress', type: 'address' },
            { internalType: 'uint256', name: 'percentage', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        { stateMutability: 'payable', type: 'receive' },
      ];
  
  
      var contractaddress = '0x337156242FA1FC88C4C5c39Ff4d875EAAD9b10Df'
     
      //  const web3 = window.web3
      const web3 = new Web3(Web3.givenProvider)
      const accounts = await web3.eth.getAccounts()
  
    
      console.log('Sender :  ' + accounts[0])
  
      const instance =  new web3.eth.Contract(abi, contractaddress)
  
    var mintnft =  await instance.methods
        .getMinted()
        .call();
        var totalmintnft =  await instance.methods
        .getMaxSupply()
        .call();

        setMintedNft(mintnft);
        setTotalMintedNft(totalmintnft);
        

        

    }



    GetData();
   

    async function walletProvider() {
      // await login();

      try {
        if (await detectEthereumProvider()) {
          // setProvider(true);
          // window.web3 = new Web3(window.ethereum);
          const web3 = new Web3(getProvider() || Web3.givenProvider)

          // const web3 = window.web3;
          if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
            const contractaddress = REACT_APP_CONTRACT_ADDRESS
            const ct = new web3.eth.Contract(abi, contractaddress)
            settotalSupply(10)

            if (nftquantity - (await ct.methods.totalSupply().call()) == 0) {
              setErrorMsg('All NFTs minted, Sale has ended')
            }

            const prevMetaMaskAccount = await web3.eth.getAccounts()
            // console.log("prevMetaMaskAccount ==> ", prevMetaMaskAccount);
            const provider = getProvider()

            if (prevMetaMaskAccount.length === 0) {
              const accountsList = await provider.request({
                method: 'eth_requestAccounts',
              })
              // console.log(provider, "accountsList ==> ", accountsList.length);
              if (accountsList && accountsList.length > 0) {
                toast.success('Metamask wallet connected successfully')
              }
            }
          } else {
            // setProvider(false);
            setErrorMsg(
              'Select "' +
                SELECTEDNETWORKNAME +
                '" network in your wallet to mint the NFT',
            )
          }
        } else {
          setErrorMsg(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
          )
          // setProvider(false);
        }
        if (window.ethereum) {
          handleEthereum()
        } else {
          window.addEventListener('ethereum#initialized', handleEthereum, {
            once: true,
          })
          setTimeout(handleEthereum, 10000)
        }

        function handleEthereum() {
          const { ethereum } = window
          if (ethereum && ethereum.isMetaMask) {
            console.log('Ethereum successfully detected!')
            // setProvider(true);
          } else {
            setErrorMsg('Please install MetaMask!')
            // setProvider(false);
          }
        }
      } catch (error) {
        console.log('Error :: ', error)
        if (error && error.code && error.message) {
          toast.error(error.message)
        }
      }
    }
     walletProvider();
  }, [])

  async function resetMinting(ct) {
    settotalSupply(await ct.methods.totalSupply().call())
    setQuantity(1)
    setHideMinting(false)
  }

  async function loadWeb3() {
    setHideMinting(true)
    // await login();

    try {
      if (await detectEthereumProvider()) {
        const web3 = new Web3(getProvider() || Web3.givenProvider)

        if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
          // creating contract instance
          const contractaddress = REACT_APP_CONTRACT_ADDRESS
          const ct = new web3.eth.Contract(abi, contractaddress)
          let current = await ct.methods.totalSupply().call()
          console.log(nftquantity, '======= current ========', current)
          if (Number(current) === nftquantity) {
            console.log('======= total equal ========')
            toast.warn('No NFT Found')
            console.log('Sold out')
            await resetMinting(ct)
            return
          }
          const baseURIis = await ct.methods.baseURI().call()
          console.log('get baseURIis ==> ', baseURIis)

          const provider = getProvider()
          const prevMetaMaskAccount = await web3.eth.getAccounts()
          // console.log("prevMetaMaskAccount ==> ", prevMetaMaskAccount);

          if (prevMetaMaskAccount.length === 0) {
            const accountsList = await provider.request({
              method: 'eth_requestAccounts',
            })
            // console.log("accountsList ==> ", accountsList.length);

            if (accountsList && accountsList.length > 0) {
              toast.success('Metamask wallet connected successfully')
            }
          }

          // const web3 = window.web3;

          // Meta Mask Connected Account Address
          let metaMaskAccount = await web3.eth.getAccounts()
          metaMaskAccount = metaMaskAccount[0]

          const requiredBalance =
            Number(current) < 2000
              ? `${REACT_APP_MINT_PRICE * quantity}`
              : `${REACT_APP_MINT_PRICE_AFTER_2K * quantity}`

          await web3.eth.getBalance(metaMaskAccount, async (err, result) => {
            if (err) {
              console.log(err)
              await resetMinting(ct)
              return
            } else {
              const walletBalance = web3.utils.fromWei(result, 'ether')
              console.log('walletBalance ', walletBalance + ' ETH')
              console.log('Compare Balance: ', walletBalance, requiredBalance)
              if (walletBalance < requiredBalance) {
                toast.error('Insufficient balance')
                await resetMinting(ct)
                return
              } else {
                try {
                  await ct.methods
                    .mint()
                    .send({
                      from: metaMaskAccount,
                      value: web3.utils.toBN(
                        web3.utils.toWei(requiredBalance, 'ether'),
                      ),
                    })
                    .on('transactionHash', async function (hash) {
                      console.log('transactionHash :: ', hash)
                      toast.success('Please wait minting is in progress')
                      setLoading(true)
                    })
                    .on('receipt', async function (receipt) {
                      console.log('receipt :: ', receipt)
                      toast.success(
                        `You have minted ${quantity} NFT successfully.`,
                      )
                      setLoading(false)

                      await resetMinting(ct)
                    })
                } catch (error) {
                  await resetMinting(ct)
                  console.log('Error :: ', error)
                  if (error && error.code && error.message) {
                    toast.error(error.message)
                  }
                }
              }
            }
          })
        } else {
          setHideMinting(false)
          toast.warn('Please Connect to ETHEREUM network')
          console.log('===== SELECTEDNETWORK failed ==========')
          setErrorMsg(
            'Select "' +
              SELECTEDNETWORKNAME +
              '" network in your wallet to mint the NFT',
          )
        }
      } else if (window.web3) {
        console.log('===== detectEthereumProvider failed ==========')
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        setHideMinting(false)
        console.log('===== detectEthereumProvider not found ==========')
        // window.alert(
        //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
        // );
        {
          setErrorMsg(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
          )
        }
      }
    } catch (error) {
      setHideMinting(false)
      console.log('Error :: ', error)
      if (error && error.code && error.message) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div>
      {!errormsg ? (
        <div className="row mintingsection py-5">
          <div className="col-sm-12">
            <div className="yellow">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 'auto',
                  width: '320px',
                }}
                className="mt-2"
              >
                <h3 className="text-white">Quantity</h3>
                <div style={{ marginLeft: '10px' }}>
                  <button
                    className="minus back-button px-3 mx-1"
                    // disabled={hideMinting}
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1)
                      }
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{ fontSize: 30, margin: '0 15px', color: '#fff' }}
                  >
                    {quantity}
                  </span>
                  <button
                    className="plus back-button px-3 mx-1"
                    //  disabled={hideMinting}
                    onClick={() => {
                      if (quantity < 10) {
                        setQuantity(quantity + 1)
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              className="mt-3 mint-btn mx-auto d-block"
              // disabled={hideMinting}
              onClick={() => {
                MintNFT()
              }}
            >
              {loading ? 'Loading...' : 'Mint a BTCBULLDOG!'}
            </button>
            {/* <button
              className="mt-3 mint-btn mx-auto d-block"
            >Minting <i class="fa fa-spinner fa-spin"></i></button> */}

            <h5 className="mt-2 supplytext"> <span style={{fontWeight :"bold"}} > Minted Nft :</span> {mintedNft  } / {totalMintedNft}</h5>
            {/* <h5 className="mt-2 supplytext"> {mintedNft  } / {totalMintedNft}</h5> */}
          </div>
        </div>
      ) : (
        <h5 className="mt-2 supplytext">
          <b>{errormsg}</b>
        </h5>
      )}
    </div>
  )
}

export default Mintbtn
