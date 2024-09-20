// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Accounting {
    struct Transaction {
        uint amount;
        address sender;
        address receiver;
        uint timestamp;
        string description;
    }

    mapping (address => uint) public balances;
    Transaction[] public transactions;
    address public owner;

    event Deposit(address indexed account, uint amount);
    event Withdrawal(address indexed account, uint amount);
    event TransactionAdded(uint indexed id, uint amount, address receiver, uint timestamp, string description);


    constructor(){
        owner = msg.sender;
    }

    modifier  onlyOwner(){
        require (msg.sender == owner, "only the ownwer can call this fubction");
        _;
    }

    function deposit() public payable{
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    function withdraw(uint amount) public{
        require(amount > 0, "amount must be greater than 0");
        require(amount <= balances[msg.sender], "insufficient balalnce");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function addTransaction(address receiver, uint amount, string memory description) public {
        require(amount > 0, "Amount must be greater or equals to the amount");
        require(balances[msg.sender] >= amount, "insufficient balalnce");

        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        transactions.push(Transaction(amount, msg.sender, receiver,block.timestamp, description));
        emit TransactionAdded(transactions.length - 1, amount, msg.sender, block.timestamp, description);

    }
    function getTransactionsCount() public view returns(uint){
        return transactions.length;
    }
    function getTransactionById(uint id) public view returns (uint,address, address, uint,string memory ){
        require(id < transactions.length , "invalid transaction id");

        Transaction memory transaction = transactions[id];
        return (transaction.amount, transaction.sender, transaction.receiver, transaction.timestamp, transaction.description);
    }





}