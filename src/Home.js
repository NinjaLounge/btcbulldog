import React, { useState, useEffect } from 'react'
import abi from './abi.json'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { toast } from 'react-toastify'
import Counter from "./Counter";
import Mintbtn from "./mintbtn.js";
import gifimg from "./images/gifi1.gif";
// import gifimg from "./images/v1.mp4";
import team2 from "./images/z6.gif";
import hero1 from "./images/hero1.gif";
import team3 from "./images/z7.gif";
import team4 from "./images/z8.gif";
import Logo from "./images/logo.png";
import logo from "./images/logo.png";
// import Video from './Videos/vdo.mp4'



const SELECTEDNETWORK = '1'
const SELECTEDNETWORKNAME = ' ETHEREUM MAINNET'
const nftquantity = 10


function Home() {

  const [loading, setLoading] = useState(false);
  const [errormsg, setErrorMsg] = useState(false);
  const [wallet, setWallet] = useState("Connect Wallet");

  useEffect(()=>{
    walletProvider();
  })



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



  async function walletProvider() {
    // await login();

    try {
      if (await detectEthereumProvider()) {
        // setProvider(true);
        // window.web3 = new Web3(window.ethereum);
        const web3 = new Web3(getProvider() || Web3.givenProvider)
       const abi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"mintPrice","type":"uint256"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"uint256","name":"max","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"NftCreator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"URI","type":"string"}],"name":"SetcontractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_contractMeta","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_distributorFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_feeReciever","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_tokenIdTracker","outputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"TokenToAdd","type":"address"},{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"addTokenToBuy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"percent","type":"uint256"}],"name":"addWalletToBuy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"artistFeeReciever","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"artistPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"canMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewardsInToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"devFeeReciever","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"Adds","type":"address[]"}],"name":"excludeFromrewardMultiple","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"excludedFromRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxSupply","outputs":[{"internalType":"uint256","name":"max","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMintPrice","outputs":[{"internalType":"uint256","name":"mintPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinted","outputs":[{"internalType":"uint256","name":"minted","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getReflectionBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReflectionBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getServiceFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStoragePrice","outputs":[{"internalType":"uint256","name":"storagePrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAutostaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingReciever","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mintMany","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"mintMultiples","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"token","type":"address"}],"name":"recoverStuckToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reflectPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reflectionBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"TokenToRemove","type":"address"}],"name":"removeTokenToBuy","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"ToRemove","type":"address"}],"name":"removeWalletToBuy","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IDEXRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"setAdditionalAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"setArtistFeeReciever","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"reciever","type":"address"}],"name":"setFeeReciever","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"setMarketingFeeReciever","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"Allowed","type":"bool"}],"name":"setMintingEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"setReflectPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"setTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokensToBuy","outputs":[{"internalType":"address","name":"buyableToken","type":"address"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCollected","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDividend","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReflectionVolume","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalrewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"walletsToSend","outputs":[{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
        // const web3 = window.web3;
        await window.ethereum.enable();

        if ((await web3.eth.net.getId()) == SELECTEDNETWORK) {
          const contractaddress = "0x337156242FA1FC88C4C5c39Ff4d875EAAD9b10Df"
          const ct = new web3.eth.Contract(abi, contractaddress)
          

          

          const prevMetaMaskAccount = await web3.eth.getAccounts()
          // console.log("prevMetaMaskAccount ==> ", prevMetaMaskAccount);
          setWallet(prevMetaMaskAccount[0].slice(0,4) + "..." + prevMetaMaskAccount[0].slice(-2));
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



  const launchDate = new Date("Fabruary 28, 2022 00:00:00");
  const now = new Date();
  now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
  let launch = now >= launchDate ? true : true;




  return (
    <div>
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand" href="/">
            <img className="navlogo" src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler bg-light ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item active">
                <span className="px-lg-4 NavBtn  ">
                  <a href="/#home">HOME</a>
                </span>
              </li>
              <li className="nav-item ">
                <span className="px-lg-4 NavBtn ">
                  {" "}
                  <a href="/#about">ABOUT</a>
                </span>
              </li>
              {/* <li className="nav-item">
                <span className="px-lg-4 NavBtn" href="#">
                  {" "}
                  <a href="/#Roadmap">ROADMAP</a>
                </span>
              </li> */}
              <li className="nav-item">
                <span className="px-lg-4 NavBtn" href="#">
                  {" "}
                  <a href="/#Team">Trait</a>
                </span>
              </li>
              <li className="nav-item">
                <span className="px-lg-4 NavBtn" href="#">
                  {" "}
                  <a href="/#Faq">FAQ</a>
                </span>
              </li>
             
              <li className="nav-item">
                <span className="px-lg-4 NavBtn" href="#">
                  {" "}
                  <a href="Dashboard/dashboard.html">Dashboard</a>
                </span>
              </li>
            </ul>
            {/* <span className="d-block ml-auto text-center">
              <a
                href="https://twitter.com/btc_bulldog"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter mx-2 py-3 icons"></i>
              </a>
              <a
                href="https://t.me/btcbulldogofficial"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-telegram mx-2 py-3 icons"></i>
              </a>
              <a
                href="https://www.facebook.com/BTCBullDog"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook mx-2 py-3 icons"></i>
              </a>
              <a
                href="https://www.instagram.com/BTCbulldog.official/ "
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram mx-2 py-3 icons"></i>
              </a>

             

            </span> */}

            <button
            style={{ right:"0%" , position:"absolute"}}
              className="mt-3 mint-btn  d-block"
              // disabled={hideMinting}
              onClick={() => {
                walletProvider()
              }}
            >
              {wallet}
            </button>
          </div>
        </nav>
      </div>

      {/* <div>
        <h1>Moralis Hello World!</h1>
        <button onClick={login}>Moralis Metamask Login</button>
        <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      </div> */}

      <div className="hero" id="home">
        <div className="pt-3 container">
          <div className="row">
            <div className="col-md-12">
              <img
                src={Logo}
                className="rounded mx-auto d-block logo"
                alt="..."
              ></img>
              {launch ? <Mintbtn /> : <Counter />}
            </div>
          </div>
        </div>
      </div>
      <div className="story py-5 container" id="about">
        <div className="row flex-md-row-reverse align-items-center">
          <div className="col-md-6">
            <div className="dz" id="one">
           
              <img src={hero1} className="gifimg" />
           

              {/* <p><SimpleSlider /></p> */}
            </div>
            {/* <h5 className=" text-center Stext ">LLC GANG</h5> */}
          </div>
          <div className="col-md-6">
            <a id="lession2"></a>
            <h1 className="titletext">Win 1 Bitcoin!</h1>
            {/* <br> */}
            {/* <br> */}
            <p className=" text-lg Post-Mint text-warning">
           <ul>
            <li>
            Acquire one of our unique NFTs, and you will have the chance to MINT the GOLDEN TICKET, bringing 1 BTC directly into your wallet!
            </li>
            <li>
            The lucky minters of the 80 Ultra NFTs will get an additional prize of 200$.
            </li>
            <li>
            25% of all minting funds will be redistributed to all NFT holders as WBTC ( After our Token Launch on ETH will be spread between 15% WBTC and 15% BitDog ETH)

            </li>
            <li>
            20% of all minting funds will be used to buy back our BSC Chart and Burn or Inject LP


            </li>
            <li>
            Further rewards from all volume of the NFTs will go back to all NFT holders
            </li>
           </ul>
           </p>
          </div>
        </div>
      </div>



      {/* ============== second=============== */}

      <div className="story py-5 container" id="about">
        <div className="row flex-md-row-reverse align-items-center">
          <div className="col-md-6">
            <div className="dz" id="one">
           
              <img src={gifimg} className="gifimg" />
           

              {/* <p><SimpleSlider /></p> */}
            </div>
            {/* <h5 className=" text-center Stext ">LLC GANG</h5> */}
          </div>
          <div className="col-md-6">
            <a id="lession2"></a>
            <h1 className="titletext">Welcome to BTCBULLDOG</h1>
            {/* <br> */}
            {/* <br> */}
            <p className=" text-lg Post-Mint text-warning">
            BTCBullDog is Proud to present our NFT Collection. Eye-watering art infused with fantastic utility combined in a balanced synergy.The future of Utility NFTs is here!Mint a BitDog-NFT and enjoy royalties from all NFT collection as WBTC and BitDog ETH(as soon as the token launches).An innovative and unique Contract Developed by CryptoBatmanBSC will give the NFTs the glimmer they deserve. Enjoy them by keeping them in your wallet and receive Passive Income or have fun and trade them.With tremendous experience in the field of design, the artist DarkLurker created these NFTs to enhance your visual experience and imagination.Join our amazing community to find out more!
            </p>
          </div>
        </div>
      </div>

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Road Map >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      {/* <div className="container Timelinee py-5">
        <div className="row Timelinee">
          <div className="col-md-12">
            <a id="Roadmap"></a>
            
            <h1 className="titletext text-center pb-3">Roadmap</h1>
            <div
              className="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              <h2 className="titletext text -center py-3">Pre-mint</h2>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingOne">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Pre-mint
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseOne"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingOne"
                >
                  <div className="panel-body">
                    <p className="">
                      $100,000 Marketing Budget. <br />
                      ETH & NFT Giveaways on socials. <br />
                      Pre-sale discount for whitelisted minters. <br />
                    </p>
                  </div>
                </div>
              </div>
              <br />
              <h2 className="titletext text -center py-3">Post-mint</h2>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingTwo">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Buy land and open club in Metaverse.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseTwo"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingTwo"
                >
                  <div className="panel-body">
                    <p className="">
                      After Minting is completed, our team will begin roadmap
                      activation by announcing metaverse land acquisition and
                      the commencement of the construction of the club in the
                      metaverse.
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingThree">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseThree"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Donation towards wildlife conservation.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseThree"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingThree"
                >
                  <div className="panel-body">
                    <p className="">
                      Up to $100,000 will be donated towards the conservation of
                      endangered BTCBULLDOGs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingFour">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseFour"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Exclusive merchandise drop for all minters.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseFour"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingFour"
                >
                  <div className="panel-body">
                    <p className="">
                      Initial minters will be given access to special edition
                      merchandise.
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingFive">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseFive"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Vote for a physical club to be opened.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseFive"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingFive"
                >
                  <div className="panel-body">
                    <p className="">
                      Holders will be given the opportunity to decide whether
                      LLC should open a club in the real world.
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingSix">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseSix"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Dates for community events become public.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseSix"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingSix"
                >
                  <div className="panel-body">
                    <p className="">
                      Live event to be held in Dubai to meet influencers and
                      creators that made all this possible. LLC team will
                      continue marketing to raise the floor price and engage the
                      community through giveaways and events organised on
                      discord.
                    </p>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="RheadingSeven">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#roadmapsec"
                      href="#RcollapseSeven"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Plans for future projects.
                    </a>
                  </h4>
                </div>
                <div
                  id="RcollapseSeven"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="RheadingSeven"
                >
                  <div className="panel-body">
                    <p className="">
                      We will then release a second drop that helps to raise the
                      value of your NFT. All holders will receive a free 3D NFT
                      as part of our second project. Royalties will be
                      reinvested back into LLC to help continue to grow the
                      project and maintain its longevity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div> */}

      <a id="Team"></a>
      <div className="team pt-5 px-5 container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="titletext text-center pb-3"></h1>
            {/* <p className="text-warning text-lg Post-Mint text-center">
              LLC was founded by three young Australians with the help of a
              global hand-picked team with extensive experience in Marketing and
              Business.{" "}
            </p> */}
          </div>
        </div>
        <h1 className="titletext text-center pb-3">Traits</h1>

        <div className="row">
          <div className="col-md-4 px-4 ">
            <img src={team4} className=" d-block mx-auto dz" id="one" />
            <h3 className="teamname pt-4">Common Trait</h3>

          </div>
          <div className="col-md-4 px-4 mx-0 ">
            <img src={team3} className="d-block mx-auto dz" id="one" />
            <h3 className="teamname pt-4">Epic Trait </h3>
    
          </div>
          <div className="col-md-4 px-4 mx-0">
            <img src={team2} className="d-block mx-auto dz  " id="one" />
            <h3 className="teamname pt-4">Legendary Trait</h3>
           
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="container">
          <a id="Faq"></a>
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center wow zoomIn mt-5">
                <h1 className="titletext text-center pb-3">
                  Frequently Asked Questions
                </h1>
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div
                className="panel-group"
                id="accordion"
                role="tablist"
                aria-multiselectable="true"
              >
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingOne">
                    <h4 className="panel-title">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        What is the SmartContract address ?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseOne"
                    className="panel-collapse collapse in"
                    role="tabpanel"
                    aria-labelledby="headingOne"
                  >
                    <div className="panel-body">
                      <p className="text-white">
                      0x337156242FA1FC88C4C5c39Ff4d875EAAD9b10Df
                      </p>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        How can I buy a BTCBULLDOG NFT?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseTwo"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div className="panel-body text-white">
                      <p>
                        You will be able to purchase a BTCBULLDOG NFT directly
                        on this website with Ethereum (ETH) by using the
                        MetaMask extension.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <h4 className="panel-title">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        What is the mint price of BTCBULLDOG NFT ?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseThree"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree"
                  >
                    <div className="panel-body text-white">
                      <p>
                        Our Pre-Sale mint price is 0.05 ETH + gas fees per NFT.
                         People will  mint 
                        NFTs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFour">
                    <h4 className="panel-title text-white">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        How long after minting will my NFT be revealed?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseFour"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFour"
                  >
                    <div className="panel-body text-white">
                      <p>The reveal will be instant. </p>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFour">
                    <h4 className="panel-title text-white">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        How Mint Transaction will  happend ?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseSix"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFour"
                  >
                    <div className="panel-body text-white">
                      <p> Remember there are two transactions that you will need to approve in order to mint your NFT(s). The first transaction will approve access to ETH, and the second will mint your NFT(s). Please wait for each of the transactions to complete in order to receive your NFT(s). </p>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFive">
                    <h4 className="panel-title text-white">
                      <a
                        className="collapsed"
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        How can I contact the team?
                      </a>
                    </h4>
                  </div>
                  <div
                    id="collapseFive"
                    className="panel-collapse collapse"
                    role="tabpanel"
                    aria-labelledby="headingFive"
                  >
                    <div className="panel-body text-white">
                      <p>
                        We are all super active, you can find us on Discord and
                        Twitter and Instagram!{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-2" />
      <div className="text-center text-white ">
        <a href="https://twitter.com/btc_bulldog" target="_blank">
          <i className="fab fa-twitter mx-2 py-3 icons"></i>
        </a>
        <a
                href="https://t.me/btcbulldogofficial"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-telegram mx-2 py-3 icons"></i>
              </a>

        <a href="https://www.facebook.com/BTCBullDog" target="_blank">
          <i className="fab fa-facebook mx-2 py-3 icons"></i>
        </a>
        <a href="https://www.instagram.com/BTCbulldog.official/ " target="_blank">
          <i className="fab fa-instagram mx-2 py-3 icons"></i>
        </a>
        <small className="d-block pb-2">
          © 2022
          {/* <a href="https://www.fiverr.com/share/vzY2RA">- Developed by Sabirpro</a> */}
        </small>
      </div>
    </div>
  );
}

export default Home;
