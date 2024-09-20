import { ethers } from 'ethers';
import { useState } from 'react';

function Deposit({ contract, account }) {
    const [amount, setAmount] = useState(0);
  
    const handleDeposit = async () => {
      if (!contract || !account) {
        alert("Contract or account not connected yet.");
        return;
      }
  
      try {
        const amountInWei = ethers.utils.parseEther(amount.toString());
        console.log("Amount in Wei:", amountInWei.toString()); // Log the deposit amount for debugging
  
        // Sending the deposit transaction
        const tx = await contract.deposit({ value: amountInWei });
        console.log("Transaction sent:", tx); // Log transaction details
        await tx.wait(); // Wait for the transaction to be mined
        alert(`Deposited ${amount} ETH successfully!`);
      } catch (error) {
        console.error("Deposit failed", error);
        alert("Deposit failed! Check the console for error details.");
      }
    };
  
    return (
      <div className="section">
        <h2>Deposit</h2>
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
    );
  }

export default Deposit;  