import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
function Transactions({ contract, account }) {
    const [transactions, setTransactions] = useState([]);
  
    // Function to fetch transactions from the blockchain
    const fetchTransactions = async () => {
      if (!contract || !account) {
        alert("Contract or account not connected yet.");
        return;
      }
  
      try {
        // Get the total number of transactions from the contract
        const txCount = await contract.getTransactionsCount();
        const txList = [];
  
        // Loop through all transaction IDs and fetch each transaction
        for (let i = 0; i < txCount; i++) {
          const tx = await contract.getTransactionById(i);
          txList.push({
            id: i,
            amount: ethers.utils.formatEther(tx[0]), // Convert amount from Wei to Ether
            sender: tx[1],
            receiver: tx[2],
            timestamp: new Date(tx[3] * 1000).toLocaleString(), // Convert timestamp to human-readable date
            description: tx[4],
          });
        }
  
        // Update the state with fetched transactions
        setTransactions(txList);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        alert("Could not retrieve transactions");
      }
    };
  
    useEffect(() => {
      // Fetch the transactions when the component is loaded or the contract changes
      if (contract) {
        fetchTransactions();
      }
    }, [contract]);
  
    return (
      <div className="section">
        <h2>Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id}>
              <p>Amount: {tx.amount} ETH</p>
              <p>Sender: {tx.sender}</p>
              <p>Receiver: {tx.receiver}</p>
              <p>Timestamp: {tx.timestamp}</p>
              <p>Description: {tx.description}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    );
  }
export default Transactions;  