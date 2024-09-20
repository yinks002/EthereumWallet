import React, {useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import abi from "./abi";
import Withdraw from './components/Withdraw';
import Deposit from './components/Deposit';
import AddTransaction from './components/AddTransaction';
import Transactions from './components/Transaction';

function App() {

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [provider, setProvider]= useState(null);
  const contractAddress = "0x3304BDCb4Cca97429e7DdB4A198593c8234aB7F2";



  const initializeContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance); // Set contract globally
      console.log("Contract initialized:", contractInstance); // Log the contract instance for debugging
    }
  };
  // Function to get the balance
  const getBalance = async () => {
    if (contract && account) {
      const balance = await contract.balances(account); // Fetch balance from the contract
      setBalance(ethers.utils.formatEther(balance));
    }
  };
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected the connection");
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  useEffect(() => {
    connectWallet()
    if (account) {
      initializeContract();
      getBalance();
    }
  }, [account]);
  return (
    <div className="App">
      <h1>Simple Accounting DApp</h1>
      <p>Welcome to the Accounting App</p>
      <p>Connected Account: {account}</p>
            <p>Balance: {balance} ETH</p>
            <button onClick={getBalance}>Refresh Balance</button>
      {/* Deposit Section */}
      <Deposit contract= {contract} account={account} provider= {provider}/>

      {/* Withdraw Section */}
      <Withdraw contract= {contract} account={account} provider= {provider}/>

      {/* Add Transaction Section */}
      <AddTransaction   contract= {contract} account={account} provider= {provider}/>

      {/* Transaction List Section */}
      <Transactions contract= {contract} account={account} provider= {provider}/>
    </div>
  );
}







export default App;


































