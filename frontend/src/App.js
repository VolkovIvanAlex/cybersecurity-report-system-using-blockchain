import './App.css';
import {useEffect, useState} from "react";
import { ethers } from "ethers";
import IPFSUpload from "./artifacts/contracts/IPFSUpload.sol/IPFSUpload.json";
import FileUpload from "./components/FileUpload";
import ShareModal from "./components/ShareModal";
import RevokeModal from "./components/RevokeModal";
import Display from "./components/Display";

function App() {  
  const [walletAccount, setWalletAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [walletProvider, setWalletProvider] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
        if (walletProvider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await walletProvider.send('eth_requestAccounts', []);
          let signer = walletProvider.getSigner();
          setWalletProvider(signer);

          let address = await signer.getAddress();
          setWalletAccount(address);

          let contractAddress = "0x7Bafa44a539E500CF12b53fa4fF31c9Ea76FE533";
          const contract = new ethers.Contract(
            contractAddress,
            IPFSUpload.abi, // smart contract ABI
            signer
          );
          setContract(contract);
        } else {
          alert('Please install Metamask.');
        }
      } catch (e) {
        alert('Please switch to OP testnet.');
        return;
      }
    };

    connectWallet();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  function disconnect(){
    setWalletAccount("");
  }

  return (
    <>
      <button data-modal-target="share-popup-modal" data-modal-toggle="share-popup-modal" type="button" 
      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mx-2 my-2" >
        Share
      </button>
      <ShareModal contract={contract}></ShareModal>

      <button data-modal-target="revoke-popup-modal" data-modal-toggle="revoke-popup-modal" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2"> 
        Revoke
      </button>
      <RevokeModal contract={contract}></RevokeModal>
      
      {!walletAccount && (
        <button type="button" className="connect text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mx-2 my-2" onClick={refreshPage}>
          Connect with MetaMask
        </button>
      )}

      {walletAccount && (
        <button type="button" className="disconnect text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2" onClick={disconnect}>
          Disconnect
        </button>
      )}
      

      <div className="App">
        <h1 class="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Report incident to </span>blockchain</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <h4 class="my-2.5 font-extrabold text-white">Address:<small class="ms-2 font-semibold"> {walletAccount ? walletAccount : "Not connected"}</small></h4>
        
        <FileUpload
          account={walletAccount}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={walletAccount}></Display>
      </div>
    </>
  );
}

export default App;
