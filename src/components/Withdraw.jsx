import { ethers } from 'ethers';
import { useState } from 'react';


function Withdraw({contract, account }) {
    const [amount, setAmount] = useState(0);
    
    const handleWithdraw = async() => {
      if (!contract || !account) {
        alert("Contract or account not connected yet.");
        return;
      }
      try {
        const amountInWei = ethers.utils.parseEther(amount.toString());
        const transaction = await contract.withdraw(amountInWei);
        transaction.wait();
        alert(`Withdrawn: ${amount} ETH`);
  
      }catch (error){
        alert("transaction failed")
        console.log(error)
      }
    };
  
    return (
      <div className="section">
        <h2>Withdraw</h2>
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    );
  }

  export default Withdraw;