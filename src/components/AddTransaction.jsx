import { ethers } from 'ethers';
import { useState } from 'react';


function AddTransaction({contract, account}) {
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
  
    const handleAddTransaction = async() => {
      if (!contract || !account) {
        alert("Contract or account not connected yet.");
        return;
      }
      try {
      const amountInWei = ethers.utils.parseEther(amount.toString())
      const transact = await contract.addTransaction(receiver, amountInWei, description) 
      transact.wait() 
      alert(`Transaction: Sent ${amount} ETH to ${receiver} with description: "${description}"`);
      } catch (error) {
        alert("transaction failed")
        console.log(error)
      }
     
    };
  
    return (
      <div className="section">
        <h2>Add Transaction</h2>
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>
    );
  }

export default AddTransaction;